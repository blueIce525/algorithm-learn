var tree = {
  val: 1,
  right: {
    val: 7,
    right: {
      val: 9
    },
    left: {
      val: 8
    }
  },
  left: {
    val: 2,
    right: {
      val: 4,
      left: {
        val: 5
      },
      right: {
        val: 6
      }
    },
    left: {
      val: 3
    }
  }
};
const binaryTreePathsBt = tree => {
  let stack = [[tree, tree.val]];
  let res = [];
  while (stack.length) {
    let [node, path] = stack.shift();
    if (!node.left && !node.right) {
      res.push(path);
    } else {
      if (node.left) {
        stack.push([node.left, `${path}->${node.left.val}`]);
      }
      if (node.right) {
        stack.push([node.right, `${path}->${node.right.val}`]);
      }
    }
  }
  return res;
};
//满足条件所有路径和
const pathSumBt = (root, target) => {
  if (root == null) return [];
  let stack = [[root, root.val, [root.val]]];
  let res = []
  while (stack.length) {
    let [node, val, path] = stack.shift();
    if (!node.left && !node.right && val == target) {
      res.push(path)
    } else {
      if (node.left) {
        stack.push([node.left, node.left.val + val, [...path, node.left.val]]);
      }
      if (node.right) {
        stack.push([node.right, node.right.val + val, [...path, node.right.val]]);
      }
    }
  }
  return res
};
console.log(binaryTreePathsBt(tree));

const dfs = (tree, value = []) => {
  if (!tree.val) return;
  value.push(tree.val);
  if (tree.right) dfs(tree.right, value);
  if (tree.left) dfs(tree.left, value);
  return value;
};

//bfs 遍历N树
const levelOrder = tree => {
  let stack = [];
  let res = [];
  if (tree) stack.push(tree);
  while (stack.length) {
    let num = [];
    let size = stack.length;
    for (let i = 0; i < size; i++) {
      let node = stack.shift();
      num.push(node.val);
      for (let item of node.children) {
        if (item) stack.push(item);
      }
    }
    res.push(num);
  }
  return res;
};

//bfs 二叉树深度（大）
var maxDepth = function (root) {
  let res = 0;
  let stack = [];
  let resList = [];
  if (root) stack.push(root);
  while (stack.length) {
    res++;
    let len = stack.length;
    for (let i = 0; i < len; i++) {
      let node = stack.pop();
      resList.push(node.val);
      if (node.left) {
        stack.push(node.left);
      }
      if (node.left) {
        stack.push(node.right);
      }
    }
  }
  return { res, resList };
};

//bfs 二叉树深度（小）
var minDepth = function (root) {
  let res = 0;
  let stack = [];
  if (root) stack.push(root);
  while (stack.length) {
    let len = stack.length;
    res++;
    for (let i = 0; i < len; i++) {
      let node = stack.shift();
      if (!node.right && !node.left) {
        return res;
      }
      if (node.left) {
        stack.push(node.left);
      }
      if (node.right) {
        stack.push(node.right);
      }
    }
  }
  return res;
};

//bfs 翻转二叉树
var invertTree = function (root) {
  if (!root) return root;
  let stack = [root];
  while (stack.length) {
    let node = stack.shift();
    [node.left, node.right] = [node.right, node.left];
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return root;
};
