function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  var a = new Node("a");
  var b = new Node("b");
  var c = new Node("c");
  var d = new Node("d");
  var e = new Node("e");
  var f = new Node("f");
  var g = new Node("g");
  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.left = f;
  c.right = g;
  // console.log(a);
  
  //             A
  //        B         C
  //     D     E   F     G
  
  // 二叉树的遍历 前序遍历 中序遍历 后序遍历（还原二叉树）
  
  // 1. 前序遍历 ABDECFG
  function frontLoop(root) {
    if (!root) return;
    console.log(root.value); //先打印自己
    frontLoop(root.left); // 再打印左子树
    frontLoop(root.right); // 再打印右子树
  }
  // forLoop(a);
  
  // 2. 中序遍历 DBEAFCG
  function centerLoop(root) {
    if (!root) return;
    centerLoop(root.left); // 先打印左子树
    console.log(root.value); //再打印自己
    centerLoop(root.right); // 再打印右子树
  }
  // centerLoop(a);
  
  // 3. 后序遍历 DEBFGCA
  
  function endLoop(root) {
    if (!root) return;
    endLoop(root.left); // 先打印左子树
    endLoop(root.right); // 再打印右子树
    console.log(root.value); //再打印自己
  }
  // endLoop(a);
  
  //TODO 没有中序还原不了二叉树
  // 4. 根据前序和中序还原二叉树
  var front = ["A", "B", "D", "E", "C", "F", "G"];
  var center = ["D", "B", "E", "A", "F", "C", "G"];
  // function repairTree(front, center) {
  //   if (
  //     !front ||
  //     !center ||
  //     !front.length ||
  //     !center.length ||
  //     front.length !== center.length
  //   )
  //     return null;
  //   var root = new Node(front[0]);
  //   var index = center.indexOf(root.value);
  //   var frontLeft = front.slice(1, index + 1);
  //   var centerLeft = center.slice(0, index);
  //   var frontRight = front.slice(index + 1, front.length);
  //   var centerRight = center.slice(index + 1, center.length);
  //   root.left = repairTree(frontLeft, centerLeft);
  //   root.right = repairTree(frontRight, centerRight);
  //   return root;
  // }
  // console.log(repairTree(front, center));
  // endLoop(repairTree(front, center));
  
  // 5. 根据后序和中序还原二叉树
  var end = ["D", "E", "B", "F", "G", "C", "A"];
  var center = ["D", "B", "E", "A", "F", "C", "G"];
  // function repairTree(end, center) {
  //   if (
  //     !end ||
  //     !center ||
  //     !end.length ||
  //     !center.length ||
  //     end.length !== center.length
  //   )
  //     return null;
  //   var root = new Node(end[end.length - 1]);
  //   var index = center.indexOf(root.value);
  //   var endLeft = end.slice(0, index);
  //   var centerLeft = center.slice(0, index);
  //   var endRight = end.slice(index, end.length - 1);
  //   var centerRight = center.slice(index + 1, center.length);
  //   root.left = repairTree(endLeft, centerLeft);
  //   root.right = repairTree(endRight, centerRight);
  //   return root;
  // }
  // console.log(repairTree(end, center));
  // frontLoop(repairTree(end, center));
  
  // 广度优先和深度优先搜索
  
  // 6. 树的深度优先搜索
  function deepSearch(root, target) {
    if (!root) return false;
    if (root.value === target) return true;
    var left = deepSearch(root.left, target);
    var right = deepSearch(root.right, target);
    return left || right;
  }
  // console.log(deepSearch(a, "h"));
  
  // 7. 树的广度优先搜索
  function rangeSearch(rootList, target) {
    if (!rootList || rootList.length === 0) return false;
    var childrenList = [];
    for (let i = 0; i < rootList.length; i++) {
      if (rootList[i] && rootList[i].value === target) {
        return true;
      } else {
        rootList[i] && childrenList.push(rootList[i].left);
        rootList[i] && childrenList.push(rootList[i].right);
      }
    }
    return rangeSearch(childrenList, target);
  }
  console.log(rangeSearch([a], "g"));
  