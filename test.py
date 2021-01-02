#from sparder import get_popular_data
import time
#data = get_popular_data()
#print(data)

def get_server_time():
    '''
    获取服务器时间
    :return:
    '''
    time_str = time.strftime('%Y{}%m{}%d %H:%M:%S')  # 第二个参数没传就使用当前时间戳
    return time_str.format('-', '-')