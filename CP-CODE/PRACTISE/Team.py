n=int(input())
count=0
for x in range(n):
    arr=list(map(int,input().split()))
    count+= 0 if sum(arr)<2 else 1
print(count)