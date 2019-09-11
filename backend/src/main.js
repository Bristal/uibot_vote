const botsdk = require("@tencent/botsdk");
let online = new botsdk.OnlineServiceFactory();
let echorsp = {
  result: '-1',
  err_msg: '',
  seq: 0
}
const TITLE_PREFIX = 'votetitle';
const ITEM_LIST_PREFIX = 'votetitleitemlist';
const TITLE_LIST_PREFIX = 'votetitlelist';
const ITEM_DESC = 'voteitem';

// 保存投票结果
let parseVote = async (info) => {
  let kv = online.createStorageService()
  // 前缀
  let keyprefix = "vote" + info['vote_id'] + '_' + info['title_id'];      // 格式：vote4_4
  // 结果
  console.log(keyprefix, info['item_list']);
  let saveadd = new Promise(async (rs, rj) => {
    let retlist = [];
    for (let item of (info['item_list'] || [])) {
      // item的结构为：
      // "item_list": [
      //   {
      //       "item_id": "7",
      //       "desc": "op1111",
      //       "item_num": 0,
      //       "value": "7",
      //       "title": "op1111"
      //   }
      // ]
      let key = keyprefix + '_' + item.item_id;   // 设置一个变量     格式：vote4_4_7    查看 105行

      console.log('保存选项数目-->',key)
      let old = await kv.getInt(key);
      // 保存投票结果  投票自增
      let now = await kv.incr(key); 
      console.log(key,now);
      console.log('old now',old,now);

      // 封装导出结果
      retlist.push({
        'item': item,
        'desc': item.desc,
        'vote_number': now
      });
      console.log('retlist', retlist);
    }
    rs(retlist);
  });
  let retlist = await saveadd.catch((e) => {
    console.error(e);
  });
  if (!retlist) {
    console.error('retlist error');
    return;
  }

  echorsp['result'] = 0;
  echorsp['err_msg'] = "succ";
  echorsp['data'] = retlist;
  echorsp['vote_id'] = info['vote_id'];
  // echorsp['title_list'] = [
  //   {
  //     'title_id': 1,
  //     'title': '题目一',
  //     'item_list': retlist,
  //     'choose_item_list': []
  //   }
  // ]
  console.log('echorsp', echorsp);
};

// 查询投票结果
let parseQuery = async (info) => {
  // info 的结构
  // {
  //   "cmd": "queryvote",
  //   "seq": 68104,
  //   "vote_id": 4
  // }
  let kv = online.createStorageService();
  let title_list = [];
  
  let title_list_str = await kv.doOne("get",TITLE_LIST_PREFIX + info['vote_id']);   // 获取 title id，正常情况下只有一个元素
  console.log('title_list_str',title_list_str);
  let title_id_list = title_list_str.split(',');  // 元素存放至 title_id_list

  for (let title_id of title_id_list) {
    // 前缀
    let title = await kv.doOne("get",TITLE_PREFIX+title_id);  // 获取 title的内容 
    console.log('title--->',title);

    let keyprefix = "vote" + info['vote_id'] + '_' + title_id;    // 格式：vote4_4
    let item_list_str = await kv.doOne("get",ITEM_LIST_PREFIX + title_id);    // 获取option id数组
    let item_id_list = item_list_str.split(',');
    console.log('keyprefix-->',keyprefix,'option id数组-->',item_list_str);

    let queryvote = new Promise(async (rs, rj) => {
      let item_list = [];
      for (let optionid of item_id_list) {      // 遍历 option数组
        let desc = await kv.doOne("get",ITEM_DESC+optionid);        // 遍历 optionid 获取option 内容
        console.log('desc',desc);

        let key = keyprefix + '_' + optionid;       // 格式：vote4_4_7
        let exist = await kv.exist(key);
        console.log(`${key}-->`, exist);

        let cur = 0;
        if (exist) {
          cur = await kv.getInt(key);
        }
        console.log(key, cur);
        item_list.push({
          item_id:optionid,
          desc:desc,
          item_num:cur
        });
        console.log('item_list', item_list);
      }
      rs(item_list);
    });
    let item_list = await queryvote.catch((e) => {
      console.error(e);
    });
    if (!item_list) {
      console.error('retlist error');
      return;
    }
    title_list.push({
      title_id: title_id,
      title:title,
      item_list:item_list
    })
  }

  echorsp['result'] = 0;
  echorsp['err_msg'] = "succ";
  echorsp['title_list'] = title_list;
  console.log('echorsp', echorsp);
};

// 创建投票
let parseAdd = async (info) => {
  let kv = online.createStorageService()
  // voteid序列
  let getvotekey = "getvoteid";
  let vote_id = await kv.incr(getvotekey);
  console.log('vote_id',vote_id);
  console.log('info',JSON.stringify(info));
  let title_id_list = [];
  for (let t of (info['title_list'] || [])) {
    // t 的结构为：
    // [
    //   {
    //       "title": "cscs",
    //       "item_list": [
    //           {
    //               "desc": "cscs1"
    //           },
    //           {
    //               "desc": "cscs2"
    //           }
    //       ]
    //   }
    // ]
    let title_id = await kv.incr('gettitleid');   // 生成title id
    console.log('title_id',title_id);
    title_id_list.push(title_id);     // 保存 title id

    let item_id_list = [];
    for (let item of (t['item_list'])) {    // item 就是每一次的 option 选项
      let item_id = await kv.incr('getitemid');     // 获取item id，自增
      item_id_list.push(item_id);   // 存储每一次的 item id

      await kv.doOne("set",ITEM_DESC + item_id, [item['desc']]);
      // 存储这样的结构  voteitem1  -->  [optionxxx]
      console.log('item[desc]',item['desc'])
    }

    // save
    await kv.doOne("set",TITLE_PREFIX + title_id, [t['title']]);
    // 存储这样的结构  votetitle1  -->  [titlexxx]
    console.log('title',t['title'])
    await kv.doOne("set",ITEM_LIST_PREFIX + title_id, [item_id_list.join(',')]);
    // 存储这样的结构  votetitleitemlist1  -->  [1,2]  存放 option 的id数组
    console.log('item_id_list',item_id_list.join(','))
  }
  await kv.doOne("set",TITLE_LIST_PREFIX + vote_id, [title_id_list.join(',')]);
  // 存储这样的结构  votetitlelist1  -->  [1,2]  存放 title 的id数组，正常情况下应该就只有一个元素
  console.log('title_id_list',title_id_list.join(','))

  echorsp['result'] = 0;
  echorsp['err_msg'] = "succ";
  echorsp['vote_id'] = vote_id;
  console.log('echorsp', echorsp);
}

let msgrouter = async (msgobj) => {
  let reqJson = null;
  try {
    console.log(msgobj.extra.param);
    reqJson = JSON.parse(msgobj.extra.param);
  }
  catch (e) {
    console.log('bot error', e);
    echorsp['result'] = -3;
    echorsp['err_msg'] = "bot router error";
    return 'bot router error';
  }
  echorsp['seq'] = reqJson['seq'];
  if (reqJson['cmd'] === 'vote') {
    return await parseVote(reqJson);
  }
  if (reqJson['cmd'] === 'queryvote') {
    return await parseQuery(reqJson);
  }
  if (reqJson['cmd'] === 'addvote') {
    return await parseAdd(reqJson);
  }
};

module.exports = async function (context) {
  // 上下文
  var echoResp = "";
  echorsp = {
    result: '-1',
    err_msg: '',
    seq: 0
  }
  // 初始化 SDK
  var initSDKResult = await online.init(context);
  if (initSDKResult) {
    console.log("init sdk succ");
    console.log(JSON.stringify(online.getMessage()));
    echoResp = await msgrouter(online.getMessage());
    console.log('echoResp', echoResp);
  } else {
    console.log("init sdk fail");
    echorsp['result'] = -2;
    echorsp['err_msg'] = "SDK OL Init Failed";
  }

  // 返回结果
  return online.makeTextResponse(JSON.stringify(echorsp));
};