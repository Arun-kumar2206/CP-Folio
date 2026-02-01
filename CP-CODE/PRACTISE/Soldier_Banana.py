k,n,w=list(map(int,input().split()))
req=0
i=1
while w:
    w-=1
    req+=i*k
    i+=1
print(req-n if req-n>0 else 0)