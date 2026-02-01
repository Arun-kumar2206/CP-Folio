n=int(input())
tram=[]
for x in range(n):
    tram.append(list(map(int,input().split())))
max_req=0
cur=0
for i in range(n):
    if i==0:
        cur=tram[i][-1]
        max_req=max(max_req,cur)
        continue
    if i==n-1:
        continue
    cur-=tram[i][0]
    cur+=tram[i][1]
    max_req=max(max_req,cur)
print(max_req)