n, k = map(int, input().split())

nums_list = list(map(int, input().split()))

if len(set(nums_list)) == 1:
    print(0)
    exit()

seen = set()
operations = 0

max_operations = n * n

while operations < max_operations:
    state = tuple(nums_list)

    if state in seen:
        print(-1)
        exit()
    
    seen.add(state)

    nums_list.append(nums_list[k - 1])
    nums_list.pop(0)
    operations += 1

    if len(set(nums_list)) == 1:
        print(operations)
        exit()

print(-1)