n,r=list(map(int,input().split()))
r-=1
arr=list(map(int,input().split()))
c=[1 if x>=arr[r] and x!=0 else 0 for x in arr ]
print(sum(c))