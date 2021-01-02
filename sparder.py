import json

import requests
import parsel
import csv
#import inset_db
import re
def get_popular_data():
    f = open('B站排行榜数据.csv', mode='w', encoding='utf-8-sig', newline='')
    csv_writer = csv.DictWriter(f, fieldnames=['id','title', 'bf', 'dm', 'author', 'score', 'url'])
    csv_writer.writeheader()
    url = 'https://www.bilibili.com/v/popular/rank/all?spm_id_from=333.851.b_7072696d61727950616765546162.3'
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36'
    }
    response = requests.get(url=url, headers=headers)
    selector = parsel.Selector(response.text)
    lis = selector.css('.rank-list li')
    data=[]
    dit = {}
    i=1
    for li in lis:
        title = li.css('.info a::text').get()    # 标题
        bf_info = li.css('div.content > div.info > div.detail > span:nth-child(1)::text').get().strip()     # 播放量
        dm_info = li.css('div.content > div.info > div.detail > span:nth-child(2)::text').get().strip()     # 弹幕量
        bq_info = li.css('div.content > div.info > div.detail > a > span::text').get().strip()      # 作者
        score = li.css('.pts div::text').get()      # 综合得分
        page_url = li.css('.img a::attr(href)').get()  # 视频地址
       # print("bf量与弹幕量",bf_info,dm_info)
        a = re.search("\d+(\.\d+)?", bf_info)
        bf_info = float(a.group())
        b = re.search("\d+(\.\d+)?", dm_info)
        dm_info = float(b.group())
        if dm_info<20:
            dm_info=dm_info*10000
        dit = {
            'id':i,
            'title': title,
            'bf': bf_info,
            'dm': dm_info,
            'author': bq_info,
            'score': score,
            'url': page_url,
        }
        csv_writer.writerow(dit)
        #inset_db.insert(dit['id'],dit['title'],dit['bf'],dit['dm'],dit['author'],dit['score'],dit['url'])
        i=i+1
        data.append(dit)
    #inset_db.close_()
    data=json.dumps(data)
    #print(type(data))
    # for i in data:
    #     print(i["id"])
    #print(data)
    return data
#data=get_popular_data()
#print(data)

