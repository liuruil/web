##  定义一个变量（）单行注释
qq_number = 2

""" 多行注释
变量类型分类  使用 type(变量) 可以查看一个数据的类型
数字型
1. int,long(长)   整型
2. float          浮点型
3. bool           布尔型 True (非0) / False (0)
4. complex        复数型 主要用于科学计算，例如平面场问题，波动问题，电感电容

非数字型
1. str   字符串
2.       列表
3.       元组
4.       字典
"""

# 在python定义变时，不需要指定变量的类型
# 在运行时，python解释器会根据赋值语句右侧的数据 自动推导出准确类型

name = "刘睿"
age = 18
gender = True # True / False
height = 1.75
weight = 75.0 # 也是 float类型
2 ** 64 # 1844444444444444L 长整型 (python3 不区分long和int，只有int)


"""
不同类型变量之间的计算
1. 数字型变量之间可以直接计算
2. 如果布尔型 True === 1 False === 0
"""

# 打印数据

print(type(2 ** 64))