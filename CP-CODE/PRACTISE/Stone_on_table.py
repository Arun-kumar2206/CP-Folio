c=int(input())
s=[x for x in input()]
i=1
res=[]
for x in s:
    if not res:
        res.append(x)
        continue
    if res[-1]!=x:
        res.append(x)
print(c-len(res))