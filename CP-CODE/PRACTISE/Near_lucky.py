n=input().strip()
def near_lucky(s):
    for x in s:
        if x !="4" and  x!="7":
            return False

    return True
n=sum([1 for x in n if x=="4" or x=="7"])
print("YES" if near_lucky(str(n)) else "NO")