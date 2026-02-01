n=int(input())
if n%2==0:
    if n==2:
        print("NO")
    elif (n-2)%2==0:
        print("YES")
    elif (n/float(2))%2==0:
        print("YES")
else:
    print('NO')