(function(){
  const chart = {
    container: "#tree",
    rootOrientation: "WEST",
    nodeAlign: "BOTTOM",
    siblingSeparation: 35,
    subTeeSeparation: 45,
    connectors: { type: 'step' },
    animation: { nodeAnimation: "easeOutQuart", nodeSpeed: 300, connectorsAnimation: "easeOutQuart", connectorsSpeed: 300 },
    node: { collapsable: true }
  };

  // Helpers
  const Root = (text) => ({ text: { name: text }, HTMLclass: 'root', collapsable: true });
  const Yellow = (text) => ({ text: { name: text }, HTMLclass: 'yellow', collapsable: true });
  const Item = (name) => ({ text: { name }, HTMLclass: 'brown small' });

  // Root
  const root = Root('区块链工程师');

  // Columns
  const basics = Yellow('加密与分布式基础');
  basics.children = [
    Item('哈希与签名：SHA-256 / ECDSA'),
    Item('Merkle 树与区块结构'),
    Item('P2P 网络与Gossip'),
    Item('共识概念：最终性/拜占庭容错')
  ];

  const bitcoin = Yellow('比特币与UTXO');
  bitcoin.children = [
    Item('UTXO 模型与脚本'),
    Item('挖矿与难度调整'),
    Item('钱包/地址与助记词'),
    Item('运行全节点与区块浏览')
  ];

  const ethereum = Yellow('以太坊与 EVM');
  ethereum.children = [
    Item('账户模型与Gas'),
    Item('EVM 指令与存储布局'),
    Item('交易、日志与事件'),
    Item('RPC 与节点服务（Infura/Alchemy）')
  ];

  const solidity = Yellow('智能合约开发');
  solidity.children = [
    Item('Solidity 语法与安全模式'),
    Item('标准：ERC-20/721/1155'),
    Item('库与可升级合约'),
    Item('单元测试与覆盖率')
  ];

  const toolchain = Yellow('工具链与框架');
  toolchain.children = [
    Item('Hardhat / Truffle'),
    Item('Foundry / forge & cast'),
    Item('OpenZeppelin 合约库'),
    Item('部署与验证')
  ];

  const dapp = Yellow('DApp 与前后端集成');
  dapp.children = [
    Item('Web3.js / Ethers.js'),
    Item('钱包接入：MetaMask / WalletConnect'),
    Item('签名与授权（EIP-712）'),
    Item('事件监听与索引')
  ];

  const storage = Yellow('预言机与存储');
  storage.children = [
    Item('预言机：Chainlink'),
    Item('去中心化存储：IPFS / Arweave'),
    Item('The Graph 索引器'),
    Item('数据可用性与检索')
  ];

  const l2 = Yellow('扩展与跨链');
  l2.children = [
    Item('Rollups：Optimistic / ZK'),
    Item('侧链与桥接'),
    Item('状态通道与支付通道'),
    Item('MEV 与交易排序（了解）')
  ];

  const security = Yellow('安全审计与合规');
  security.children = [
    Item('常见漏洞：重入/溢出/签名重放'),
    Item('静态/动态分析与形式化验证'),
    Item('权限与多签'),
    Item('KYC/AML 与合规考量')
  ];

  const devops = Yellow('节点与运维');
  devops.children = [
    Item('节点部署与同步策略'),
    Item('监控与日志'),
    Item('备份与密钥托管'),
    Item('CI/CD 与多网络发布')
  ];

  const usecases = Yellow('应用场景');
  usecases.children = [
    Item('DeFi 协议'),
    Item('NFT 与市场'),
    Item('DAO 与治理'),
    Item('企业联盟链（可选）')
  ];

  root.children = [
    basics, bitcoin, ethereum, solidity,
    toolchain, dapp, storage, l2, security,
    devops, usecases
  ];

  window.TreeData = { chart, nodeStructure: root };
})();
