import re
a='12.5万'
#a
#=re.sub([1-9]\d*
#a=int(re.sub("\D","",a))
a=re.search("\d+(\.\d+)?",a)
a=float(a.group())
#print(a.group())
print(a)
print(type(a))