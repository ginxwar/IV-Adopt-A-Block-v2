

function db_start_trip(name, surname, type)
{
 if (!name || !surname || !type)
   {return;}
 loading();
 USERNAME = name;
 USERSURNAME = surname;
 USERTYPE = type;
 $.ajax(
  {
	  type: "POST",
	  url: "https://iv-adopt-a-block-v2.jit.su/users",
	  data: '{ "firstname":"'+name+'", "lastname":"'+surname+'", "tripCategory":"'+type+'"}',
	  headers:{
	           "Content-Type": "application/json",
	           "Accept-Version": "~1"
	          },		
	  dataType: 'json',          	
	  success: function(response)
	                 {
	                  TRIP_ID = response.UUID;
	                  alert("tripId: "+TRIP_ID);
	                  db_start_trip_callback (USERNAME, USERSURNAME, USERTYPE);
	                  stopLoading();
	                 },
	  error: function(response)
	                 {
	                  alert('db_start_trip: '+JSON.stringify(response));
	                  stopLoading();
	                 }
  });
}


function db_resume_trip(tripId)
{
 if (!tripId)
   {return;}
 $.ajax(
  {
	  type: "POST",
	  url: "https://iv-adopt-a-block-v2.jit.su/users/resumed",
	  data: '{ "tripID": "'+tripId+'" }',
	  headers: {
	           "Content-Type": "application/json",
	           "Accept-Version": "~1"
	          },		
	  dataType: 'json',          	
	  success: function(response)
	                 {alert(JSON.stringify(response));
	                  db_resume_trip_callback(); 
	                 },
	  error: function(response)
	                 {alert('db_resume_trip :'+JSON.stringify(response)); }
  });
}


function db_complete_trip(tripId, bucket, comment, blocks)
{
 if (!tripId || !bucket)
   {return;}
 loading();
 $.ajax(
  {
	  type: "POST",
	  url: "https://iv-adopt-a-block-v2.jit.su/users/completed",
	  data: '{ "tripID": "'+tripId+'", "buckets": '+bucket+',  "blocks": '+blocks+', "comments": "'+comment+'" }',
	  headers: {
	           "Content-Type": "application/json",
	           "Accept-Version": "~1"
	          },		
	  dataType: 'json',          	
	  success: function(response)
	                 {alert(JSON.stringify(response));
	                  db_complete_trip_callback();
	                  stopLoading(); 
	                 },
	  error: function(response)
	                 {
	                  alert('db_complete_trip '+JSON.stringify(response)); 
	                  stopLoading();
	                 }
  });
}


function db_pause_trip(tripId)
{
 if (!tripId)
   {return;}
 $.ajax(
  {
	  type: "POST",
	  url: "https://iv-adopt-a-block-v2.jit.su/users/paused",
	  data: '{ "tripID": "'+tripId+'" }',
	  headers: {
	           "Content-Type": "application/json",
	           "Accept-Version": "~1"
	          },		
	  dataType: 'json',          	
	  success: function(response)
	                 {alert(JSON.stringify(response));
	                  db_pause_trip_callback(); 
	                 },
	  error: function(response)
	                 {alert(JSON.stringify(response)); }
  });
}



function db_post_waypoint(tripId, point)
{
 if (!tripId || !point)
   {return;}
 $.ajax(
  {
	  type: "POST",
	  url: "https://iv-adopt-a-block-v2.jit.su/users/waypoints",
	  data: '{"tripID": "'+tripId+'","point": {"lat": '+point.lat+',"long": '+point.lng+',"epoch": '+new Date().getTime()+' } }',
	  headers: {
	           "Content-Type": "application/json",
	           "Accept-Version": "~1"
	          },		
	  dataType: 'json',          	
	  success: function(response)
	                 {console.log(JSON.stringify(response)); },
	  error: function(response)
	                 {console.log(JSON.stringify(response)); }
  });
}

 

function db_post_image(formData)
{
 $.ajax(
  {
	  type: "POST",
	  url: "https://iv-adopt-a-block-v2.jit.su/users/images",
	  data: formData,
	 /* headers: {
	           "Content-Type": "multipart/form-data",
	           "Accept-Version": "~1"
	          },*/	
	          
      contentType: false,
      cache: false,
      processData:false,    
	  
	  xhr: function() {
                    var myXhr = $.ajaxSettings.xhr();
                    if(myXhr.upload)
                      {
                        myXhr.upload.addEventListener('progress',
                        							   function (event)
                        							     {
	                        							  var percent = parseInt(event.loaded / event.total * 100);
	                        							  progressElement.css("width", percent+'%'); //refer to handle_photo()
                        							     }, 
                        							   false);
                      }
                    return myXhr;
                },
	  success: function(response)
	                 { console.log(JSON.stringify(response));
	                  db_post_image_callback(); 
	                 },
	  error: function(response)
	                 {alert(JSON.stringify(response)); 
		              db_post_image_callback();
	                 }
  });
}




function db_read_blocks()
{
 console.log("db_handler.js#db_read_blocks(). data still read by programatically, not from db");
 polygons_json = {"polygons": [
 
 {"polygon": {"name":"Embarcadero 1", "id":"0", "coordinates": [ {"lat":"34.41723461642956", "lng":"-119.85544323921204"}, {"lat":"34.41723461642956", "lng":"-119.85528767108917"}, {"lat":"34.416893864410284", "lng":"-119.85529839992522"}, {"lat":"34.41650000645026", "lng":"-119.85529839992522"}, {"lat":"34.416495581069384", "lng":"-119.85545933246611"}, {"lat":"34.41669472297695", "lng":"-119.85545396804808"}]}},
 
{"polygon": {"name":"Cervantes 1", "id":"1", "coordinates": [ {"lat":"34.41649115568827", "lng":"-119.85537350177763"}, {"lat":"34.41648673030693", "lng":"-119.85452592372893"}, {"lat":"34.41648230492535", "lng":"-119.8537641763687"}, {"lat":"34.416367244922135", "lng":"-119.85376954078673"}, {"lat":"34.41636281953423", "lng":"-119.8541611433029"}, {"lat":"34.416371670309786", "lng":"-119.8549497127533"}, {"lat":"34.41638052108443", "lng":"-119.85538423061372"}]}} ,

{"polygon": {"name":"El Greco 1", "id":"2", "coordinates": [ {"lat":"34.41582734586971", "lng":"-119.85537886619566"}, {"lat":"34.41582734586971", "lng":"-119.85474050045015"}, {"lat":"34.41582734586971", "lng":"-119.85381782054901"}, {"lat":"34.41570343411999", "lng":"-119.85382318496704"}, {"lat":"34.41570343411999", "lng":"-119.85431671142578"}, {"lat":"34.415707859542785", "lng":"-119.85538423061372"}]}},

{"polygon": {"name":"Picasso 1", "id":"3", "coordinates": [ {"lat":"34.415167956233404", "lng":"-119.8554003238678"}, {"lat":"34.41516353078204", "lng":"-119.85476732254027"}, {"lat":"34.41516353078204", "lng":"-119.85380709171294"}, {"lat":"34.415039618048766", "lng":"-119.853812456131"}, {"lat":"34.415039618048766", "lng":"-119.85433816909791"}, {"lat":"34.415044043506676", "lng":"-119.8551481962204"}, {"lat":"34.41504846896437", "lng":"-119.8554003238678"}]}},

{"polygon": {"name":"Segoria 1", "id":"4", "coordinates": [ {"lat":"34.41450413591184", "lng":"-119.8554003238678"}, {"lat":"34.41449971042536", "lng":"-119.85476195812225"}, {"lat":"34.41450413591184", "lng":"-119.85380172729491"}, {"lat":"34.41437137121524", "lng":"-119.85380172729491"}, {"lat":"34.41438022220158", "lng":"-119.85434353351593"}, {"lat":"34.41438464769439", "lng":"-119.85509991645812"}, {"lat":"34.414382434947996", "lng":"-119.85540300607681"}]}},

{"polygon": {"name":"Cordoba 1", "id":"5", "coordinates": [ {"lat":"34.413835884799674", "lng":"-119.85539495944977"}, {"lat":"34.413835884799674", "lng":"-119.8548424243927"}, {"lat":"34.41383145927782", "lng":"-119.8543033003807"}, {"lat":"34.41382703375572", "lng":"-119.85384464263915"}, {"lat":"34.41370975733514", "lng":"-119.85384732484816"}, {"lat":"34.41371418286342", "lng":"-119.85460638999938"}, {"lat":"34.41372082115543", "lng":"-119.85539227724075"}]}},

{"polygon": {"name":"Pardall 1", "id":"6", "coordinates": [ {"lat":"34.413169841126596", "lng":"-119.85540300607681"}, {"lat":"34.41317205390505", "lng":"-119.85475391149521"}, {"lat":"34.41316762834807", "lng":"-119.85380709171294"}, {"lat":"34.413045925439434", "lng":"-119.85380977392195"}, {"lat":"34.41304813822117", "lng":"-119.85438108444214"}, {"lat":"34.41304813822117", "lng":"-119.85511064529419"}, {"lat":"34.413045925439434", "lng":"-119.85540568828583"}]}},

{"polygon": {"name":"Madrid 1", "id":"7", "coordinates": [ {"lat":"34.412525920107605", "lng":"-119.85540568828583"}, {"lat":"34.41251706892504", "lng":"-119.85481023788451"}, {"lat":"34.4125126433334", "lng":"-119.85411822795868"}, {"lat":"34.41251706892504", "lng":"-119.85383927822112"}, {"lat":"34.41239315227075", "lng":"-119.85383927822112"}, {"lat":"34.41239315227075", "lng":"-119.85446691513062"}, {"lat":"34.4123975778687", "lng":"-119.85514283180238"}, {"lat":"34.41240642906392", "lng":"-119.85541105270384"}]}},

{"polygon": {"name":"Seville 1", "id":"8", "coordinates": [ {"lat":"34.411868717254755", "lng":"-119.85540300607681"}, {"lat":"34.41186429162881", "lng":"-119.85478341579437"}, {"lat":"34.41186429162881", "lng":"-119.85370248556137"}, {"lat":"34.41173594837468", "lng":"-119.85369712114334"}, {"lat":"34.41174037400739", "lng":"-119.85436767339705"}, {"lat":"34.41174479963989", "lng":"-119.85503286123276"}, {"lat":"34.41174479963989", "lng":"-119.8554003238678"}]}},

{"polygon": {"name":"Trigo 1", "id":"9", "coordinates": [ {"lat":"34.41122478621869", "lng":"-119.85543519258499"}, {"lat":"34.41119380659369", "lng":"-119.85537886619566"}, {"lat":"34.41119380659369", "lng":"-119.85442668199539"}, {"lat":"34.41118938093202", "lng":"-119.85373735427856"}, {"lat":"34.41106767514486", "lng":"-119.85373735427856"}, {"lat":"34.41106767514486", "lng":"-119.85412895679472"}, {"lat":"34.411076526480805", "lng":"-119.85499799251556"}, {"lat":"34.411083164982145", "lng":"-119.85544055700302"}, {"lat":"34.411118570313775", "lng":"-119.85552370548248"}]}},

{"polygon": {"name":"Sabado 1", "id":"10", "coordinates": [ {"lat":"34.41049676199762", "lng":"-119.85624253749847"}, {"lat":"34.41049454914838", "lng":"-119.85541909933089"}, {"lat":"34.41049454914838", "lng":"-119.85422551631927"}, {"lat":"34.410492336299086", "lng":"-119.85369443893433"}, {"lat":"34.410368416645106", "lng":"-119.85369443893433"}, {"lat":"34.410372842350206", "lng":"-119.8546600341797"}, {"lat":"34.41037505520265", "lng":"-119.85584557056427"}, {"lat":"34.410379480907395", "lng":"-119.85623717308044"}]}},

{"polygon": {"name":"El Nido 1", "id":"11", "coordinates": [ {"lat":"34.40983733033438", "lng":"-119.85623717308044"}, {"lat":"34.40984175606757", "lng":"-119.8552742600441"}, {"lat":"34.40983733033438", "lng":"-119.85382854938507"}, {"lat":"34.409702345359655", "lng":"-119.85382586717606"}, {"lat":"34.40970455822983", "lng":"-119.85479682683945"}, {"lat":"34.409720048319556", "lng":"-119.85623985528946"}]}},

{"polygon": {"name":"JAS", "id":"12", "coordinates": [ {"lat":"34.41049897484681", "lng":"-119.85382050275803"}, {"lat":"34.410056403846134", "lng":"-119.85382586717606"}, {"lat":"34.409702345359655", "lng":"-119.85382318496704"}, {"lat":"34.409702345359655", "lng":"-119.85368102788924"}, {"lat":"34.41017147253159", "lng":"-119.85368371009825"}, {"lat":"34.410492336299086", "lng":"-119.85369175672533"}]}},

{"polygon": {"name":"Del Playa 1", "id":"13", "coordinates": [ {"lat":"34.40897873366659", "lng":"-119.85379636287689"}, {"lat":"34.40909822960706", "lng":"-119.85376954078673"}, {"lat":"34.40926198302594", "lng":"-119.85483974218369"}, {"lat":"34.40940803310212", "lng":"-119.8558321595192"}, {"lat":"34.40948105804454", "lng":"-119.85625594854353"}, {"lat":"34.4093460724949", "lng":"-119.85626131296156"}, {"lat":"34.409186745008434", "lng":"-119.85519647598267"}, {"lat":"34.409056184758576", "lng":"-119.85434085130692"}]}},

{"polygon": {"name":"Trigo Ocean 1", "id":"14", "coordinates": [ {"lat":"34.409354924013", "lng":"-119.8563203215599"}, {"lat":"34.409855033265735", "lng":"-119.85631227493288"}, {"lat":"34.40984618180053", "lng":"-119.85615938901901"}, {"lat":"34.40933058233589", "lng":"-119.85618084669112"}]}},

{"polygon": {"name":"Trigo Ocean 2", "id":"15", "coordinates": [ {"lat":"34.41050118769592", "lng":"-119.85631763935089"}, {"lat":"34.41049897484681", "lng":"-119.85615938901901"}, {"lat":"34.409839543201", "lng":"-119.85616207122803"}, {"lat":"34.40984175606757", "lng":"-119.85631763935089"}, {"lat":"34.41012500250458", "lng":"-119.8563203215599"}]}},

{"polygon": {"name":"Trigo Ocean 3", "id":"16", "coordinates": [ {"lat":"34.410888435390376", "lng":"-119.85630691051482"}, {"lat":"34.410507826242934", "lng":"-119.85631763935089"}, {"lat":"34.41050340054499", "lng":"-119.85616475343704"}, {"lat":"34.41087958403453", "lng":"-119.85617011785507"}]}},

{"polygon": {"name":"Trigo U1", "id":"17", "coordinates": [ {"lat":"34.41081983735802", "lng":"-119.85625058412552"}, {"lat":"34.4108286887202", "lng":"-119.85607624053955"}, {"lat":"34.41088400971258", "lng":"-119.85585898160933"}, {"lat":"34.41098801307916", "lng":"-119.8556551337242"}, {"lat":"34.41122699904862", "lng":"-119.85543519258499"}, {"lat":"34.411271255634674", "lng":"-119.85558003187178"}, {"lat":"34.41106546231073", "lng":"-119.85578924417496"}, {"lat":"34.410959246203475", "lng":"-119.85604673624039"}, {"lat":"34.410941543505835", "lng":"-119.85625594854353"}]}},

{"polygon": {"name":"Trigo U2", "id":"18", "coordinates": [ {"lat":"34.41127568129201", "lng":"-119.85556930303574"}, {"lat":"34.4114659843352", "lng":"-119.85548615455627"}, {"lat":"34.41187535569322", "lng":"-119.8554727435112"}, {"lat":"34.41187535569322", "lng":"-119.85531985759735"}, {"lat":"34.41152794337214", "lng":"-119.85532522201538"}, {"lat":"34.41135091743061", "lng":"-119.85537081956862"}, {"lat":"34.41123142470828", "lng":"-119.85544055700302"}]}},

{"polygon": {"name":"Trigo U3", "id":"19", "coordinates": [ {"lat":"34.41187756850594", "lng":"-119.85532522201538"}, {"lat":"34.412242681800855", "lng":"-119.85532522201538"}, {"lat":"34.41253255849391", "lng":"-119.8553279042244"}, {"lat":"34.41249051537171", "lng":"-119.85548615455627"}, {"lat":"34.412492728168154", "lng":"-119.85572755336761"}, {"lat":"34.412371024277434", "lng":"-119.85572755336761"}, {"lat":"34.41236438587831", "lng":"-119.85547006130219"}, {"lat":"34.411879781318596", "lng":"-119.85547006130219"}]}},

{"polygon": {"name":"Trigo U4", "id":"20", "coordinates": [ {"lat":"34.412539196879706", "lng":"-119.85532253980637"}, {"lat":"34.4128091574552", "lng":"-119.85532522201538"}, {"lat":"34.41317647946178", "lng":"-119.8553279042244"}, {"lat":"34.41317869224009", "lng":"-119.85548079013824"}, {"lat":"34.4128888177864", "lng":"-119.85547810792923"}, {"lat":"34.412525920107605", "lng":"-119.8554727435112"}]}},

{"polygon": {"name":"Embarcadero 2", "id":"21", "coordinates": [ {"lat":"34.416502219140604", "lng":"-119.85544592142105"}, {"lat":"34.41614376254044", "lng":"-119.85545128583907"}, {"lat":"34.415767602727584", "lng":"-119.8554566502571"}, {"lat":"34.415767602727584", "lng":"-119.85530376434328"}, {"lat":"34.41624997206361", "lng":"-119.85530108213423"}, {"lat":"34.416504431830894", "lng":"-119.85530108213423"}]}},

{"polygon": {"name":"Embarcadero 3", "id":"22", "coordinates": [ {"lat":"34.41577202814699", "lng":"-119.8554566502571"}, {"lat":"34.41544233376063", "lng":"-119.85547006130219"}, {"lat":"34.41509493625595", "lng":"-119.85547810792923"}, {"lat":"34.41509714898346", "lng":"-119.85531717538834"}, {"lat":"34.4155573950364", "lng":"-119.85531717538834"}, {"lat":"34.41577424085659", "lng":"-119.8553118109703"}]}},

{"polygon": {"name":"Embarcadero 4", "id":"23", "coordinates": [ {"lat":"34.41510157443834", "lng":"-119.85547006130219"}, {"lat":"34.414747537308216", "lng":"-119.85547006130219"}, {"lat":"34.41444881731388", "lng":"-119.85547542572021"}, {"lat":"34.41444881731388", "lng":"-119.85531985759735"}, {"lat":"34.414884726873986", "lng":"-119.85532253980637"}, {"lat":"34.41509936171095", "lng":"-119.85531985759735"}]}},

{"polygon": {"name":"Embarcadero 5", "id":"24", "coordinates": [ {"lat":"34.41444881731388", "lng":"-119.85547810792923"}, {"lat":"34.41410805394349", "lng":"-119.85547542572021"}, {"lat":"34.41378277852199", "lng":"-119.8554727435112"}, {"lat":"34.41378277852199", "lng":"-119.85531717538834"}, {"lat":"34.41401290548169", "lng":"-119.85531985759735"}, {"lat":"34.41444439182445", "lng":"-119.85531985759735"}]}},

{"polygon": {"name":"Embarcadero 6", "id":"25", "coordinates": [ {"lat":"34.413780565759694", "lng":"-119.8554727435112"}, {"lat":"34.41345307629358", "lng":"-119.8554727435112"}, {"lat":"34.41317869224009", "lng":"-119.85547006130219"}, {"lat":"34.413185330574585", "lng":"-119.85531985759735"}, {"lat":"34.413557076465665", "lng":"-119.85531717538834"}, {"lat":"34.41378499128424", "lng":"-119.8553118109703"}]}},

{"polygon": {"name":"Embarcadero 7", "id":"26", "coordinates": [ {"lat":"34.41723682910049", "lng":"-119.85710620880126"}, {"lat":"34.41684739811824", "lng":"-119.85710620880126"}, {"lat":"34.41649115568827", "lng":"-119.85710889101027"}, {"lat":"34.41649115568827", "lng":"-119.85696136951447"}, {"lat":"34.41671463714162", "lng":"-119.85696136951447"}, {"lat":"34.41724125444214", "lng":"-119.85695600509645"}]}},

{"polygon": {"name":"Embarcadero 8", "id":"27", "coordinates": [ {"lat":"34.41649779375985", "lng":"-119.8571142554283"}, {"lat":"34.41603312747697", "lng":"-119.85711157321929"}, {"lat":"34.4157653900178", "lng":"-119.85711693763734"}, {"lat":"34.415760964598036", "lng":"-119.8569667339325"}, {"lat":"34.41613269904067", "lng":"-119.8569667339325"}, {"lat":"34.416495581069384", "lng":"-119.85696136951447"}]}},

{"polygon": {"name":"Embarcadero 9", "id":"28", "coordinates": [ {"lat":"34.4157653900178", "lng":"-119.85711157321929"}, {"lat":"34.41541356841695", "lng":"-119.85711693763734"}, {"lat":"34.41510599989299", "lng":"-119.85711961984634"}, {"lat":"34.41509936171095", "lng":"-119.85696405172348"}, {"lat":"34.415289656054156", "lng":"-119.8569667339325"}, {"lat":"34.41557067132727", "lng":"-119.8569667339325"}, {"lat":"34.4157653900178", "lng":"-119.8569667339325"}]}},

{"polygon": {"name":"Embarcadero 10", "id":"29", "coordinates": [ {"lat":"34.415108212620225", "lng":"-119.85711693763734"}, {"lat":"34.41485596133851", "lng":"-119.85711693763734"}, {"lat":"34.41446651926921", "lng":"-119.8571142554283"}, {"lat":"34.41446651926921", "lng":"-119.85696405172348"}, {"lat":"34.41465460231319", "lng":"-119.85696941614151"}, {"lat":"34.415108212620225", "lng":"-119.85697209835052"}]}},

{"polygon": {"name":"Embarcadero 11", "id":"30", "coordinates": [ {"lat":"34.41447094475745", "lng":"-119.85711693763734"}, {"lat":"34.41422754255611", "lng":"-119.85711693763734"}, {"lat":"34.41377614023492", "lng":"-119.8571142554283"}, {"lat":"34.41377614023492", "lng":"-119.85696405172348"}, {"lat":"34.4140106927255", "lng":"-119.85696405172348"}, {"lat":"34.41447094475745", "lng":"-119.85696941614151"}]}},

{"polygon": {"name":"Embarcadero 12", "id":"31", "coordinates": [ {"lat":"34.41377835299735", "lng":"-119.85711693763734"}, {"lat":"34.413464140147816", "lng":"-119.85711693763734"}, {"lat":"34.413116734426005", "lng":"-119.85712766647339"}, {"lat":"34.41311452164607", "lng":"-119.85697209835052"}, {"lat":"34.41332252270294", "lng":"-119.85697478055954"}, {"lat":"34.413780565759694", "lng":"-119.85697209835052"}]}},

{"polygon": {"name":"Trigo U5", "id":"32", "coordinates": [ {"lat":"34.41311894720586", "lng":"-119.85712498426437"}, {"lat":"34.412846774843274", "lng":"-119.85712230205536"}, {"lat":"34.41245511062085", "lng":"-119.85712230205536"}, {"lat":"34.41245511062085", "lng":"-119.85697746276855"}, {"lat":"34.41289103057228", "lng":"-119.85698014497756"}, {"lat":"34.413121159985664", "lng":"-119.85697746276855"}]}},

{"polygon": {"name":"Trigo U6", "id":"33", "coordinates": [ {"lat":"34.412459536215515", "lng":"-119.85712230205536"}, {"lat":"34.41211433912734", "lng":"-119.85712766647339"}, {"lat":"34.411747012456054", "lng":"-119.85713571310043"}, {"lat":"34.411747012456054", "lng":"-119.85698282718657"}, {"lat":"34.41197714501716", "lng":"-119.85698282718657"}, {"lat":"34.412282512245696", "lng":"-119.85697209835052"}, {"lat":"34.412463961809955", "lng":"-119.85697746276855"}]}},

{"polygon": {"name":"Trigo U7", "id":"34", "coordinates": [ {"lat":"34.411111931815235", "lng":"-119.85675215721132"}, {"lat":"34.41122699904862", "lng":"-119.85688090324402"}, {"lat":"34.41143500479956", "lng":"-119.85697209835052"}, {"lat":"34.411755863720124", "lng":"-119.85698282718657"}, {"lat":"34.4117514380882", "lng":"-119.85713571310043"}, {"lat":"34.41141287655276", "lng":"-119.8571142554283"}, {"lat":"34.41115176279855", "lng":"-119.85700964927673"}, {"lat":"34.41105661097359", "lng":"-119.85688894987106"}]}},

{"polygon": {"name":"Trigo U8", "id":"", "coordinates": [ {"lat":"34.41093933066835", "lng":"-119.85625594854353"}, {"lat":"34.410952607692295", "lng":"-119.85639274120332"}, {"lat":"34.41100571576699", "lng":"-119.85658317804335"}, {"lat":"34.4111207831465", "lng":"-119.85676020383835"}, {"lat":"34.41105439813918", "lng":"-119.85689163208008"}, {"lat":"34.41091941512848", "lng":"-119.85669046640396"}, {"lat":"34.41084860428167", "lng":"-119.85649734735487"}, {"lat":"34.41081541167659", "lng":"-119.85625594854353"}]}},

{"polygon": {"name":"Cervantes 2", "id":"35", "coordinates": [ {"lat":"34.416488942997624", "lng":"-119.8570391535759"}, {"lat":"34.416493368378866", "lng":"-119.85622376203536"}, {"lat":"34.416493368378866", "lng":"-119.85535472631454"}, {"lat":"34.416367244922135", "lng":"-119.85535204410553"}, {"lat":"34.416367244922135", "lng":"-119.85594213008879"}, {"lat":"34.416369457615986", "lng":"-119.85703378915785"}]}},

{"polygon": {"name":"El Greco 2", "id":"36", "coordinates": [ {"lat":"34.41581628232809", "lng":"-119.85538959503174"}, {"lat":"34.4158207077449", "lng":"-119.85625594854353"}, {"lat":"34.41582513316148", "lng":"-119.85705256462097"}, {"lat":"34.41570343411999", "lng":"-119.85705256462097"}, {"lat":"34.41569900869695", "lng":"-119.85657513141632"}, {"lat":"34.415692370561985", "lng":"-119.85538423061372"}]}},

{"polygon": {"name":"El Greco 3", "id":"37", "coordinates": [ {"lat":"34.41515467987862", "lng":"-119.8570391535759"}, {"lat":"34.415159105330446", "lng":"-119.85620766878128"}, {"lat":"34.415161318056256", "lng":"-119.85538959503174"}, {"lat":"34.41503740531973", "lng":"-119.85538959503174"}, {"lat":"34.41503519259061", "lng":"-119.85587239265442"}, {"lat":"34.41503740531973", "lng":"-119.85682994127272"}, {"lat":"34.41503740531973", "lng":"-119.8570364713669"}]}},

{"polygon": {"name":"Segoria 2", "id":"38", "coordinates": [ {"lat":"34.414378009455085", "lng":"-119.85540837049484"}, {"lat":"34.41450413591184", "lng":"-119.8554003238678"}, {"lat":"34.414506348655", "lng":"-119.85596895217896"}, {"lat":"34.414517412369904", "lng":"-119.85704720020294"}, {"lat":"34.41440234966331", "lng":"-119.85705256462097"}, {"lat":"34.414386860440715", "lng":"-119.85633641481398"}]}},

{"polygon": {"name":"Cordoba 2", "id":"", "coordinates": [ {"lat":"34.41384031032129", "lng":"-119.85704720020294"}, {"lat":"34.41383809756049", "lng":"-119.85633373260498"}, {"lat":"34.41383809756049", "lng":"-119.85539764165878"}, {"lat":"34.41371197009932", "lng":"-119.85539764165878"}, {"lat":"34.413716395627475", "lng":"-119.8560118675232"}, {"lat":"34.41370975733514", "lng":"-119.85704988241196"}]}},

{"polygon": {"name":"Pardall 2", "id":"39", "coordinates": [ {"lat":"34.41317205390505", "lng":"-119.85705256462097"}, {"lat":"34.41317205390505", "lng":"-119.8562827706337"}, {"lat":"34.413174266683455", "lng":"-119.85539495944977"}, {"lat":"34.41304371265762", "lng":"-119.85539764165878"}, {"lat":"34.41304813822117", "lng":"-119.85600113868713"}, {"lat":"34.41305920212896", "lng":"-119.85704988241196"}]}},

{"polygon": {"name":"Cervantes 3", "id":"40", "coordinates": [ {"lat":"34.41650000645026", "lng":"-119.85704988241196"}, {"lat":"34.416495581069384", "lng":"-119.85774993896483"}, {"lat":"34.416495581069384", "lng":"-119.85870748758316"}, {"lat":"34.41637609569723", "lng":"-119.85870748758316"}, {"lat":"34.416371670309786", "lng":"-119.85810667276382"}, {"lat":"34.416369457615986", "lng":"-119.8570364713669"}]}},

{"polygon": {"name":"El Greco 3", "id":"41", "coordinates": [ {"lat":"34.4158406221177", "lng":"-119.8586967587471"}, {"lat":"34.41583398399396", "lng":"-119.85771775245665"}, {"lat":"34.41582955857786", "lng":"-119.85704451799393"}, {"lat":"34.41570343411999", "lng":"-119.85704451799393"}, {"lat":"34.415714497676525", "lng":"-119.85812544822694"}, {"lat":"34.41572334852071", "lng":"-119.8586967587471"}]}},

{"polygon": {"name":"Picasso 3", "id":"", "coordinates": [ {"lat":"34.41515689260456", "lng":"-119.8585197329521"}, {"lat":"34.41516353078204", "lng":"-119.8577418923378"}, {"lat":"34.415159105330446", "lng":"-119.8570391535759"}, {"lat":"34.415032979861444", "lng":"-119.8570364713669"}, {"lat":"34.41503740531973", "lng":"-119.85805571079254"}, {"lat":"34.415039618048766", "lng":"-119.85852509737016"}]}},

{"polygon": {"name":"Segoria 3", "id":"42", "coordinates": [ {"lat":"34.41452183785547", "lng":"-119.85870212316513"}, {"lat":"34.41451962511271", "lng":"-119.8578706383705"}, {"lat":"34.414524050598146", "lng":"-119.85704451799393"}, {"lat":"34.4144001369174", "lng":"-119.85704183578491"}, {"lat":"34.41439792417144", "lng":"-119.85755413770674"}, {"lat":"34.4144001369174", "lng":"-119.85830783843994"}, {"lat":"34.4144001369174", "lng":"-119.85870748758316"}]}},

{"polygon": {"name":"Cordoba 3", "id":"43", "coordinates": [ {"lat":"34.41384031032129", "lng":"-119.85704988241196"}, {"lat":"34.41384252308201", "lng":"-119.85792964696884"}, {"lat":"34.41384031032129", "lng":"-119.85869407653809"}, {"lat":"34.413707544570904", "lng":"-119.85869407653809"}, {"lat":"34.41371418286342", "lng":"-119.85763192176817"}, {"lat":"34.41371197009932", "lng":"-119.85704451799393"}]}},

{"polygon": {"name":"Pardall 3", "id":"44", "coordinates": [ {"lat":"34.413174266683455", "lng":"-119.85705256462097"}, {"lat":"34.41317647946178", "lng":"-119.85758364200592"}, {"lat":"34.41317647946178", "lng":"-119.85818445682526"}, {"lat":"34.413185330574585", "lng":"-119.85870212316513"}, {"lat":"34.41306584047295", "lng":"-119.85870212316513"}, {"lat":"34.41306362769167", "lng":"-119.85792696475983"}, {"lat":"34.413061414910366", "lng":"-119.85781162977219"}, {"lat":"34.41305698934753", "lng":"-119.85704720020294"}]}},

{"polygon": {"name":"Madrid 3", "id":"45", "coordinates": [ {"lat":"34.4125126433334", "lng":"-119.85705256462097"}, {"lat":"34.412514856129256", "lng":"-119.85770702362059"}, {"lat":"34.41252149451645", "lng":"-119.85870748758316"}, {"lat":"34.41240642906392", "lng":"-119.85870748758316"}, {"lat":"34.4123975778687", "lng":"-119.85809326171875"}, {"lat":"34.41239979066759", "lng":"-119.85705524682999"}]}},

{"polygon": {"name":"Seville 3", "id":"46", "coordinates": [ {"lat":"34.41187756850594", "lng":"-119.85871016979218"}, {"lat":"34.41187756850594", "lng":"-119.85791355371474"}, {"lat":"34.41187314288047", "lng":"-119.85706329345702"}, {"lat":"34.411747012456054", "lng":"-119.85705256462097"}, {"lat":"34.41175365090419", "lng":"-119.85758900642394"}, {"lat":"34.41176250216754", "lng":"-119.85871285200118"}]}},

{"polygon": {"name":"Trigo 3", "id":"47", "coordinates": [ {"lat":"34.41120487074679", "lng":"-119.85871285200118"}, {"lat":"34.41120487074679", "lng":"-119.85777407884598"}, {"lat":"34.41121150923795", "lng":"-119.85695064067839"}, {"lat":"34.41108759064943", "lng":"-119.8568621277809"}, {"lat":"34.411083164982145", "lng":"-119.85814690589905"}, {"lat":"34.411085377815816", "lng":"-119.85870748758316"}]}},

{"polygon": {"name":"Sabado 3", "id":"", "coordinates": [ {"lat":"34.41049897484681", "lng":"-119.85872626304628"}, {"lat":"34.41050340054499", "lng":"-119.8571491241455"}, {"lat":"34.41050340054499", "lng":"-119.8562479019165"}, {"lat":"34.41036177808703", "lng":"-119.8562479019165"}, {"lat":"34.410379480907395", "lng":"-119.8578143119812"}, {"lat":"34.41038833231617", "lng":"-119.85872089862822"}]}},

{"polygon": {"name":"Del Playa 3", "id":"48", "coordinates": [ {"lat":"34.409469993663436", "lng":"-119.85626131296156"}, {"lat":"34.40966472655738", "lng":"-119.85755413770674"}, {"lat":"34.40983290460097", "lng":"-119.85862970352173"}, {"lat":"34.40970455822983", "lng":"-119.85866189002991"}, {"lat":"34.40946114215746", "lng":"-119.85704720020294"}, {"lat":"34.4093438596152", "lng":"-119.85626131296156"}]}},

{"polygon": {"name":"Del Playa 4", "id":"49", "coordinates": [ {"lat":"34.409835117467715", "lng":"-119.86263692378999"}, {"lat":"34.40984839466692", "lng":"-119.86124217510223"}, {"lat":"34.40984396893409", "lng":"-119.859761595726"}, {"lat":"34.40984396893409", "lng":"-119.85871016979218"}, {"lat":"34.40970677109997", "lng":"-119.85870480537415"}, {"lat":"34.409724474058955", "lng":"-119.86052870750426"}, {"lat":"34.409720048319556", "lng":"-119.86264228820801"}]}},


{"polygon": {"name":"Sabado 4", "id":"50", "coordinates": [ {"lat":"34.410529954729164", "lng":"-119.86262083053587"}, {"lat":"34.41052110333538", "lng":"-119.86136019229889"}, {"lat":"34.410516677638114", "lng":"-119.85871016979218"}, {"lat":"34.410383906611905", "lng":"-119.85871016979218"}, {"lat":"34.41040160942759", "lng":"-119.86034631729126"}, {"lat":"34.410419312239505", "lng":"-119.8626261949539"}]}},

{"polygon": {"name":"Trigo 4", "id":"51", "coordinates": [ {"lat":"34.411207083577224", "lng":"-119.85870480537415"}, {"lat":"34.41122921187847", "lng":"-119.8604428768158"}, {"lat":"34.411233637538025", "lng":"-119.86262083053587"}, {"lat":"34.41110086764984", "lng":"-119.86261546611786"}, {"lat":"34.411092016316466", "lng":"-119.86124753952026"}, {"lat":"34.411083164982145", "lng":"-119.85871016979218"}]}},

{"polygon": {"name":"Pasado 4", "id":"52", "coordinates": [ {"lat":"34.41176028935178", "lng":"-119.85872626304628"}, {"lat":"34.41176471498325", "lng":"-119.86060380935669"}, {"lat":"34.41177356624543", "lng":"-119.86261010169983"}, {"lat":"34.41162752029958", "lng":"-119.86261010169983"}, {"lat":"34.41162309466089", "lng":"-119.86127436161041"}, {"lat":"34.41163637157629", "lng":"-119.85872089862822"}]}},

{"polygon": {"name":"Sueno 4", "id":"53", "coordinates": [ {"lat":"34.412729497048126", "lng":"-119.86261546611786"}, {"lat":"34.41272507146773", "lng":"-119.86086130142213"}, {"lat":"34.41273392262829", "lng":"-119.85869944095612"}, {"lat":"34.41260115512161", "lng":"-119.85869944095612"}, {"lat":"34.412605580708565", "lng":"-119.86012637615202"}, {"lat":"34.412605580708565", "lng":"-119.86262083053587"}]}},

{"polygon": {"name":"Abrego 4", "id":"54", "coordinates": [ {"lat":"34.414247457308264", "lng":"-119.86259400844575"}, {"lat":"34.414238606307876", "lng":"-119.8608076572418"}, {"lat":"34.41422975530658", "lng":"-119.85869944095612"}, {"lat":"34.41409256466638", "lng":"-119.85869944095612"}, {"lat":"34.414114692204194", "lng":"-119.86012101173401"}, {"lat":"34.41412796872412", "lng":"-119.86190736293791"}, {"lat":"34.41413681973618", "lng":"-119.86259937286377"}]}},

{"polygon": {"name":"Picasso 4", "id":"55", "coordinates": [ {"lat":"34.41528301788667", "lng":"-119.86139237880707"}, {"lat":"34.41528301788667", "lng":"-119.85992252826689"}, {"lat":"34.41528301788667", "lng":"-119.85863506793974"}, {"lat":"34.41514582897423", "lng":"-119.85863506793974"}, {"lat":"34.41515467987862", "lng":"-119.85952556133269"}, {"lat":"34.41515467987862", "lng":"-119.8607861995697"}, {"lat":"34.41516353078204", "lng":"-119.8613977432251"}]}},
                               
                               
     /*Villa Rosa*/
                               {"polygon": {"name":"", "id":"", "coordinates": [ {"lat":"42.83829566853746", "lng":"13.916979432106018"}, {"lat":"42.838374340421346", "lng":"13.917424678802488"}, {"lat":"42.838453012205086", "lng":"13.917864561080933"}, {"lat":"42.838508082394085", "lng":"13.91812205314636"}, {"lat":"42.83837827401291", "lng":"13.918154239654541"}, {"lat":"42.83827993414865", "lng":"13.917601704597473"}, {"lat":"42.83818159412788", "lng":"13.917000889778137"}]}},
                               
                               {"polygon": {"name":"", "id":"", "coordinates": [ {"lat":"42.838677226239156", "lng":"13.916839957237244"}, {"lat":"42.838787366168454", "lng":"13.91744077205658"}, {"lat":"42.83890930657547", "lng":"13.918127417564392"}, {"lat":"42.838787366168454", "lng":"13.918164968490599"}, {"lat":"42.83873229622837", "lng":"13.917778730392456"}, {"lat":"42.838626089776696", "lng":"13.91719937324524"}, {"lat":"42.83856708611356", "lng":"13.916861414909363"}]}},
                               
                               {"polygon": {"name":"", "id":"", "coordinates": [ {"lat":"42.83907058222798", "lng":"13.916738033294678"}, {"lat":"42.83918072145613", "lng":"13.917344212532042"}, {"lat":"42.83930266108683", "lng":"13.917982578277588"}, {"lat":"42.83918072145613", "lng":"13.918030858039856"}, {"lat":"42.8391138512339", "lng":"13.917633891105652"}, {"lat":"42.838956509249044", "lng":"13.916775584220886"}]}},
                               
                               {"polygon": {"name":"", "id":"", "coordinates": [ {"lat":"42.83916105375122", "lng":"13.916705846786499"}, {"lat":"42.83875196406974", "lng":"13.916813135147095"}, {"lat":"42.838421543503586", "lng":"13.91690969467163"}, {"lat":"42.83817372691944", "lng":"13.916995525360107"}, {"lat":"42.83717064964024", "lng":"13.917312026023865"}, {"lat":"42.83719425164564", "lng":"13.917489051818848"}, {"lat":"42.83766628986035", "lng":"13.917328119277954"}, {"lat":"42.83831927011314", "lng":"13.917108178138733"}, {"lat":"42.83920038915478", "lng":"13.916834592819214"}]}},
                               
                               {"polygon": {"name":"", "id":"", "coordinates": [ {"lat":"42.83827993414865", "lng":"13.91695261001587"}, {"lat":"42.83823666455881", "lng":"13.916582465171814"}, {"lat":"42.838177660523804", "lng":"13.916501998901367"}, {"lat":"42.837623019840805", "lng":"13.916636109352112"}, {"lat":"42.83766235622347", "lng":"13.916775584220886"}, {"lat":"42.83812259004031", "lng":"13.916636109352112"}, {"lat":"42.83818552773173", "lng":"13.916995525360107"}]}}

 
  ]};

 return polygons_json;
}




function db_save_blocks(blocks)
{

}





