import numpy as np
import matplotlib.pyplot as plt
import time

# Helper function for insertion sort
def swap(lst, i, j):
    temp = lst[i]
    lst[i] = lst[j]
    lst[j] = temp
    return lst

# Insertion Sort
def insertionSort(A):
    for pos in range(1, len(A)):
        nextpos = pos
        while nextpos > 0 and A[nextpos] < A[nextpos - 1]:
            swap(A, nextpos, nextpos - 1)
            nextpos -= 1

# Merge Sort and Helper Function
def merge_sort(a):
    if len(a) >= 2:
        left = a[:len(a) // 2]
        right = a[len(a) // 2:]
        merge_sort(left)
        merge_sort(right)
        merge(a, left, right)

def merge(result, left, right):
    i1 = i2 = 0
    for i in range(len(result)):
        if i2 >= len(right) or (i1 < len(left) and left[i1] <= right[i2]):
            result[i] = left[i1]
            i1 += 1
        else:
            result[i] = right[i2]
            i2 += 1

# Quick Sort and Partition Function
def partition(A, low, high):
    i = low - 1
    pivot = A[high]
    for j in range(low, high):
        if A[j] <= pivot:
            i += 1
            A[i], A[j] = A[j], A[i]
    A[i + 1], A[high] = A[high], A[i + 1]
    return i + 1

def quickSort(A, low, high):
    if low < high:
        pi = partition(A, low, high)
        quickSort(A, low, pi - 1)
        quickSort(A, pi + 1, high)

# Bubble Sort
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

# Selection Sort
def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]

# Heap Sort and Helper Function
def heap_sort(arr):
    def heapify(arr, n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(arr, n, largest)

    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)

# Sorting algorithms for comparison
sorts = [
    {"name": "Insertion Sort", "sort": lambda A: insertionSort(A)},
    {"name": "Merge Sort", "sort": lambda A: merge_sort(A)},
    {"name": "Quick Sort", "sort": lambda A: quickSort(A, 0, len(A) - 1)},
    {"name": "Bubble Sort", "sort": lambda A: bubble_sort(A)},
    {"name": "Selection Sort", "sort": lambda A: selection_sort(A)},
    {"name": "Heap Sort", "sort": lambda A: heap_sort(A)}
]

# Test sizes for input data
elements = np.array([i * 1000 for i in range(1, 15)])

# Plotting setup
plt.xlabel('Size of n')
plt.ylabel('Time Complexity (seconds)')

# Measure and plot time for each algorithm
for sort in sorts:
    times = []
    for n in elements:
        arr = np.random.randint(0, 1000, size=n).tolist()  # Convert to list for in-place sorting
        start = time.time()
        sort["sort"](arr)
        end = time.time()
        times.append(end - start)
        
        # Print times for each algorithm at each input size
        print(f"{sort['name']} | Size: {n} | Time: {times[-1]:.6f} seconds")

    plt.plot(elements, times, label=sort["name"])

plt.grid()
plt.legend()
plt.show()
