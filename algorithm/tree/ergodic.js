/**
 * 创建一个节点
 * @param {*} value 
 */
function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

const a = new Node('a')
const b = new Node('b')
const c = new Node('c')
const d = new Node('d')
const e = new Node('e')
const f = new Node('f')
const g = new Node('g')
a.left = b;
b.left = d;
b.right = e;
a.right = c;
c.left = f;
c.right = g;

/**
 * 前序遍历
 * @param {*} root 根节点
 */
function frontLoop(root) {
    if (root == null) return;
    console.log(root.value); //打印自己
    frontLoop(root.left); //打印左子树
    frontLoop(root.right); //打印右子树
}
// frontLoop(a);

/**
 * 中序遍历
 * @param {*} root 
 */
function middleLoop(root) {
    if (root == null) return;
    frontMiddleLoop(root.left);
    console.log(root.value);
    frontMiddleLoop(root.right);
}
// middleLoop(a);

/**
 * 后序遍历
 * @param {*} root 
 */
function endLoop(root) {
    if (root == null) return;
    endLoop(root.left);
    endLoop(root.right);
    console.log(root.value);
}
// endLoop(a);

/**
 * 根据前序和中序返回二叉树
 * @param {*} qian 
 * @param {*} zhong 
 */
function restoreTreeByQZ(qian, zhong) {
    if (qian == null || zhong == null || qian.length == 0 || zhong.length == 0 || qian.length !== zhong.length) return null;
    const root = new Node(qian[0]); //找到树的根节点
    const index = zhong.indexOf(root.value); //找到根节点在中序的位置，左边是左子树 右边是右子树
    const qianLeft = qian.slice(1, index + 1); //找到左子树的前序
    const zhongLeft = zhong.slice(0, index);//找到左子树的中序
    const qianRight = qian.slice(index + 1, qian.length);//找到右子树的前序
    const zhongRight = zhong.slice(index + 1, zhong.length);//找到右子树的中序
    root.left = restoreTreeByQZ(qianLeft, zhongLeft);
    root.right = restoreTreeByQZ(qianRight, zhongRight);
    return root;
}
// const qian = ['A', 'B', 'D', 'E', 'C', 'F', 'G']
// const zhong = ['D', 'B', 'E', 'A', 'F', 'C', 'G']

/**
 * 根据后序和中序返回二叉树
 * @param {*} hou 
 * @param {*} zhong 
 */
function restoreTreeByHZ(hou, zhong) {
    if (hou == null || zhong == null || hou.length == 0 || zhong.length == 0 || hou.length !== zhong.length) return null;
    const root = new Node(hou[hou.length - 1])
    const index = zhong.indexOf(root.value); //找到根节点在后序遍历中的索引 左边是左子树，右边是右子树
    const houLeft = hou.slice(0, index);
    const houRight = hou.slice(index, hou.length - 1);
    const zhongLeft = zhong.slice(0, index);
    const zhongRight = zhong.slice(index + 1, zhong.length);
    root.left = restoreTreeByHZ(houLeft, zhongLeft)
    root.right = restoreTreeByHZ(houRight, zhongRight)
    return root;
}

// const zhong = ['D', 'B', 'E', 'A', 'F', 'C', 'G']
// const hou = ['D', 'E', 'B', 'F', 'G', 'C', 'A']
// console.log(restoreTreeByHZ(hou, zhong));


/**
 * @树的深度优先搜索
 * @param {Object} root 二叉树
 * @param {Any} target 目标值
 */
function deepSearch(root, target) {
    if (root == null) return false;
    if (root.value === target) return true;
    const left = deepSearch(root.left, target);
    const right = deepSearch(root.right, target)
    return left || right;
}

// console.log(deepSearch(a, 'g'))

/**
 * @树的广度优先搜索
 * @param {*} rootList 
 * @param {*} target 
 */
function breadthSearch(rootList, target) {
    if (rootList == null || (rootList.length === 0)) return false;
    var childList = []
    for (let i = 0; i < rootList.length; i++) {
        console.log(rootList[i].value)
        if (rootList[i] && (rootList[i].value === target)) {
            return true;
        } else {
            rootList[i] && childList.push(rootList[i].left);
            rootList[i] && childList.push(rootList[i].right);
        }
    }
    return breadthSearch(childList, target);
}

// console.log(breadthSearch([a], 'g'))


/**
 * @比较两棵树是否相等
 * !在前提是左右子树互换位置后不属于同一种二叉树的情况
 * @param {*} root1 比较的二叉树1
 * @param {*} root2 比较的二叉树2
 * @returns Boolean
 */
function compareTree(root1, root2) {
    if (root1 === root2) return true;
    if ((root1 == null && root2 != null) || (root1 != null && root2 == null)) return false; //一边为空，一边不为空
    if (root1.value !== root2.value) return false; //相同位置的值不相等
    var leftBool = compareTree(root1.left, root2.left);
    var rightBool = compareTree(root1.right, root2.right)
    return leftBool && rightBool; //必须左右子树都相等
}
// const a2 = new Node('a2')
// console.log(compareTree(a2, a))

/**
 * @比较两棵树是否相等
 * !在前提是左右子树互换位置后属于同一种二叉树的情况
 * @param {*} root1 比较的二叉树1
 * @param {*} root2 比较的二叉树2
 * @returns Boolean
 */
function compareTreeLREqual(root1, root2) {
    if (root1 === root2) return true;
    if ((root1 == null && root2 != null) || (root1 != null && root2 == null)) return false; //一边为空，一边不为空
    if (root1.value !== root2.value) return false; //相同位置的值不相等
    return compareTreeLREqual(root1.left, root2.left) && compareTreeLREqual(root1.right, root2.right) //必须左右子树都相等
        || compareTreeLREqual(root1.left, root2.right) && compareTreeLREqual(root1.right, root2.left) //或者左子树和右子树相等
}
// const a1 = new Node('a')
// const b1 = new Node('b')
// const c1 = new Node('c')
// a1.right = b1
// a1.left = c1
// const a2 = new Node('a')
// const b2 = new Node('b')
// const c2 = new Node('c')
// a2.left = b2
// a2.right = c2
// console.log(compareTreeLREqual(a2, a1))


/**
 * 比较两棵二叉树的变化
 * @param {*} root1 origin二叉树
 * @param {*} root2 now 二叉树
 * @param {*} diffList 变化记录的数组
 * @returns 
 */
function diffTree(root1, root2, diffList) {
    if (root1 == root2) return diffList;
    if (root1 == null && root2 != null) { //新增了节点
        diffList.push({
            type: '新增',
            origin: null,
            now: root2
        })
    } else if (root1 != null && root2 == null) {//删除了节点
        diffList.push({
            type: '删除',
            origin: root1,
            now: null,
        })
    } else if (root1.value != root2.value) {//相同的位置节点值不同了 修改了节点
        diffList.push({
            type: '修改',
            origin: root1,
            now: root2,
        })
        // 当前节点变了 不代表子节点也变了
        diffTree(root1.left, root2.left, diffList)
        diffTree(root1.right, root2.right, diffList)
    } else {
        diffTree(root1.left, root2.left, diffList)
        diffTree(root1.right, root2.right, diffList)
    }
}
// const diffList = []
// const a1 = new Node('a')
// const b1 = new Node('b')
// const c1 = new Node('c')
// const d1 = new Node('d')
// const e1 = new Node('e')
// a1.left = b1
// a1.right = c1
// c1.left = d1
// c1.right = e1
// const a2 = new Node('a')
// const b2 = new Node('b')
// const c2 = new Node('x')
// const d2 = new Node('d')
// const e2 = new Node('h')
// a2.left = b2
// a2.right = c2
// c2.left = d2
// c2.right = e2
// diffTree(a1, a2, diffList)
// console.log(diffList)

