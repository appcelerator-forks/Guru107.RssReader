exports.loadRSS=function(obj){
	var xhr = Ti.Network.createHTTPClient();
	if(obj.progress){
			xhr.ondatastream = obj.progress;
	}
	xhr.open(obj.method,obj.url);
	xhr.onload = function(){
		Ti.API.info("XHR - onload called, readyState: " + this.readyState);
		var xml = this.responseXML;
		
		if(xml === null || xml.documentElement === null){
			alert("Check your network connection!");
		}
		
		var items = xml.documentElement.getElementsByTagName('item');
		var data = [];
		
		for(var i=0;i<items.length;i++){
			var item = items.item(i);
			
			var image,title,link,pubDate;
			try{
				image = item.getElementsByTagName('img').item(0).getAttribute('src');
			}catch(e){
				image = '';
			}
			
			title = item.getElementsByTagName('title').item(0).textContent;
			link = item.getElementsByTagName('link').item(0).textContent;
			pubDate = item.getElementsByTagName('pubDate').item(0).textContent;
			data.push({
				title:title,
				link:link,
				date:pubDate,
				image:image
			});
			
			
		}
		
		if(obj.success){
				obj.success(data);
		}
	};
	
	xhr.send();
	
	xhr.onerror = function(e){
		Ti.API.error("XHR - onerror called, readyState: "+this.readyState+", error message: "+e.message);
		if(obj.error){
			obj.error(e);
		}
	};
	
	xhr = null;
};
