import pymysql

conn = pymysql.connect(host="127.0.0.1", user="root", password="123456", database="visual", charset="utf8")
cursor = conn.cursor()


def insert(id, title, bf, dm, author,score,url):
    #sql = "INSERT INTO bilibli1(id, title,bf,dm,author,score,url) VALUES (%s,%s,%s,%s,%s,%s,%s);"
    sql = "UPDATE bilibli1 SET title=%s,bf=%s,dm=%s,author=%s,score=%s,url=%s WHERE id=%s;"
    print(sql)
    try:
        #cursor.execute(sql)
        #cursor.execute(sql, [id, title, bf, dm, author, score, url])
        cursor.execute(sql, [ title, bf, dm, author, score, url,id])

        conn.commit()
    except:
        print("插入错误")
        conn.rollback()


def close_():
    cursor.close()
    conn.close()

