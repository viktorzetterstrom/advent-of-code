const fs = require("fs");

const parseBagRule = (bagRule) => {
  // (light red) bags contain (1 bright white bag, 2 muted yellow bags).
  const bagRuleRegex = /(\w+ \w+) bags contain (.+)\.$/;
  const [_, parentColor, insideBags] = bagRule.match(bagRuleRegex);

  const children = insideBags
    .split(", ")
    .map((insideBag) => {
      if (insideBag === "no other bags") return false;

      const insideBagRegex = /(\d+) (\w+ \w+) bags?/;
      const [_, amount, color] = insideBag.match(insideBagRegex);
      return {
        color: color,
        parent: parentColor,
        amount: Number(amount),
      };
    })
    .filter((a) => a);

  if (!children.length) return children;

  return [...children, { color: parentColor, parent: null, amount: 1 }];
};

const nest = (bags, color = null) =>
  bags
    .filter((item) => item.parent === color)
    .map((item) => ({ ...item, children: nest(bags, item.color) }));

const searchTree = (data, value) => {
  if (data.color === value) {
    return data;
  }
  if (data.children && data.children.length > 0) {
    for (let i = 0; i < data.children.length; i++) {
      const node = searchTree(data.children[i], value);
      if (node !== null) {
        return node;
      }
    }
  }
  return null;
};

const part1 = (bags, bagColor = "shiny gold") => {
  const results = bags.map((bag) => searchTree(bag, bagColor)).filter((a) => a);
  return results.length - 1; // don't count top-level bag
};

function postOrder(root) {
  root.sumOfChildren = 0;
  if (root.children) {
    root.children.forEach((child) => {
      root.sumOfChildren += postOrder(child, root.amount);
    });
  }
  return root.sumOfChildren * root.amount + root.amount;
}
const part2 = (bags, bagColor = "shiny gold") => {
  const bag = bags.find(({ color }) => color === bagColor);
  const sum = postOrder(bag);
  return sum - 1; // Dont count containing bag
};

const loadInput = (fileName) =>
  fs
    .readFileSync(`2020/7/${fileName}`, "utf-8")
    .split("\n")
    .flatMap(parseBagRule);

if (process.env.NODE_ENV !== "test") {
  const input = nest(loadInput("input.txt"));

  const _part1 = part1(input);
  const _part2 = part2(input);

  console.log("Part 1:", _part1);
  console.log("Part 2:", _part2);
}

module.exports = {
  loadInput,
  nest,
  part1,
  part2,
};
