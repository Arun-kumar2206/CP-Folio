n,height=list(map(int,input().split()))
h=list(map(int,input().split()))
width=0
for x in h:
    width+=1 if x<=height else 2
print(width)