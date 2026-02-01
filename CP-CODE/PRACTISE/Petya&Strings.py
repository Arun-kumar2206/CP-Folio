str1=str(input())
str2=str(input())
for x,y in zip(str1,str2):
    if ord(x.lower())<ord(y.lower()):
        print(-1)
        exit()
    elif ord(x.lower())>ord(y.lower()):
        print(1)
        exit()
print(0)