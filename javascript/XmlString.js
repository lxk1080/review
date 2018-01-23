//将字符串转化成dom对象;string转换为xml  
function stringToXml(xmlString) {  
    var xmlDoc;  
    if (typeof xmlString == "string") {  
        //FF     
        if (document.implementation.createDocument) {  
            var parser = new DOMParser();  
            xmlDoc = parser.parseFromString(xmlString, "text/xml");  
        } else if (window.ActiveXObject) {  
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");  
            xmlDoc.async = false;  
            xmlDoc.loadXML(xmlString);  
        }  
    }  
    else {  
        xmlDoc = xmlString;  
    }  
    return xmlDoc;  
}  
   
//xml转换为string  
function xmlToString(xmlDoc) {  
    if (window.ActiveXObject) {  
        return xmlDoc.xml;  //IE     
    } else {  
        return (new XMLSerializer()).serializeToString(xmlDoc);  //FF     
    }  
}  