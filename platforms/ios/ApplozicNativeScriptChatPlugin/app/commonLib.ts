    export let Base64 = {
    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        let output = "";
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;

        input = Base64.utf8Encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
            Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);

        }

        return output;
    },


    // private method for UTF-8 encoding
    utf8Encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        let utfText = "";

        for (let n = 0; n < string.length; n++) {

            let c = string.charCodeAt(n);

            if (c < 128) {
                utfText += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utfText += String.fromCharCode((c >> 6) | 192);
                utfText += String.fromCharCode((c & 63) | 128);
            }
            else {
                utfText += String.fromCharCode((c >> 12) | 224);
                utfText += String.fromCharCode(((c >> 6) & 63) | 128);
                utfText += String.fromCharCode((c & 63) | 128);
            }

        }

        return utfText;
    }

  }

export var dispName = [];
export var profilePic = [];
export var lastSeenAtTime = [];
export var groupDetails = [];

export function convoDetails(userDetails, groupFeeds){
     for(let i=0; i<userDetails.length; i++){
        if(userDetails[i].displayName)
            dispName[userDetails[i].userId] = userDetails[i].displayName;
        else if(userDetails[i].email)
        dispName[userDetails[i].userId] = userDetails[i].email;
        else
        dispName[userDetails[i].userId] = userDetails[i].userId;

        profilePic[userDetails[i].userId] = "~/images/singleUser.jpg";
        if(userDetails[i].imageLink)
            profilePic[userDetails[i].userId] = userDetails[i].imageLink;
        
        lastSeenAtTime[userDetails[i].userId] = userDetails[i].lastSeenAtTime;
    }

    console.log(groupFeeds.length);
    for(let i=0; i<groupFeeds.length; i++)
        groupDetails[groupFeeds[i].id] = groupFeeds[i]; 
  }

  export function getTime(timeStamp) {
    if(timeStamp == NaN){
        return null;
    }
    let when = new Date(timeStamp);
    let now = new Date();
    let month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    if((when.getFullYear() == now.getFullYear()) && (when.getMonth() == now.getMonth()) &&(when.getDate() == now.getDate())) {
      let time = when.getHours().toString() + ':' + when.getMinutes().toString();
      return time;
    }
    let time = month[when.getMonth()] + ' ' + when.getDate().toString();
    return time;
  }