n=int(input())
arr=[]
for x in range(n):
    arr.append(input().strip())
max_len=1
result=1
for i in range(1,n):
    if arr[i-1][-1]==arr[i][0]:
        result+=1
print(result)