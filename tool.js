const cookie = {
  set(cname,cvalue,time=24){
    var d = new Date();
    d.setTime(d.getTime()+(time*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  },
  get(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) 
    {
      var c = ca[i].trim();
      if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
  }
}

const storage = {
  set(key,val,curStorage){
    curStorage = curStorage || localStorage
    let data = {
      value:val
    }
    curStorage.setItem(key,JSON.stringify(data));
  },
  get(key,storage){
    storage = storage || localStorage
    let data = storage.getItem(key);
    if(data == null) return data || '';
    try{
      data = JSON.parse(data);
    }catch(e){
      return data;
    }
    return data.value || ''
  },
}
const date = {
  getTime(time,format='y-m-d'){
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day =  date.getDate();
    let monthText = month < 10 ? `0${month}` : month;
    let dayText = day < 10 ? `0${day}` : day;
    let text = format.replace(/y+/g,year).replace(/m+/g,monthText).replace(/d/g,dayText)
    return text;
  },
  getCurWeek(config){
    let date = new Date();
    let day = date.getDay();
    let curTime = date.getTime();
    let prepstartDay = curTime - (day - 1 ) * 24 * 60 * 60 * 1000;
    let prepEndDay = curTime;
    return {
      start_time:tool.getTime(prepstartDay,config.format),
      end_time:tool.getTime(prepEndDay,config.format)
    }
  },
  getPrepWeek(config={}){
    let date = new Date();
    let day = date.getDay();
    let curTime = date.getTime();
    let prepstartDay = curTime - (day + 7 - 1 ) * 24 * 60 * 60 * 1000;
    let prepEndDay = curTime - day * 24 * 60 * 60 * 1000;
    return {
      start_time:tool.getTime(prepstartDay,config.format),
      end_time:tool.getTime(prepEndDay,config.format)
    }
  },
  getPrepMonth(config={}){
    let date = new Date();
    let day = date.getDate();
    let curTime = date.getTime();
    let prepEndDay = curTime - day * 24 * 60 * 60 * 1000;
    let preDate = new Date(prepEndDay);
    let preTime = preDate.getTime();
    let preYear = preDate.getFullYear();
    let preMonth = preDate.getMonth() + 1;
    let preCountDay = new Date(preYear,preMonth,0).getDate()
    let prepstartDay = preTime - (preCountDay - 1) * 24 * 60 * 60 * 1000;
    return {
      start_time:tool.getTime(prepstartDay,config.format),
      end_time:tool.getTime(prepEndDay,config.format)
    }

  },
}
const tool = {
  cookie,
  storage,
  date
}

export default tool;