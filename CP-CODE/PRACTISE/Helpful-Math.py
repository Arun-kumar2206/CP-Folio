s=str(input().strip(" "))
elements=[x for x in s.split("+")]
elements=sorted(elements)
print("+".join(elements))