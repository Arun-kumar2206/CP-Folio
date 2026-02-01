n=int(input())
count=0
for x in range(n):
    temp=list(map(int,input().split()))
    count+=1 if (temp[1]-temp[0])>=2 else 0
print(count)