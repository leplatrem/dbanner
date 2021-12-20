window.addEventListener('load', async (event) => {
  const abi = [
    {
      "inputs": [],
      "name": "retrieve",
      "outputs": [
        {
          "internalType": "string",
          "name": "message",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "color",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "message",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "color",
          "type": "string"
        }
      ],
      "name": "store",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  const contract = new web3.eth.Contract(abi, "0x4521438ca6d284b5D0A4F9a159ee62E693862388");
  const result = await new Promise((resolve, reject) => {
    contract.methods.retrieve().call().then(resolve).catch(reject);
  });

  let root = document.body;
  root.textContent = result.message;
  root.style = `background-color: ${result.color}`;

  // Show the text at its maximum size (start big, reduce until no scrollbar)
  let { clientWidth: width, clientHeight: height } = document.documentElement;
  let fontSize = height;
  root.style.fontSize = `${fontSize}px`;
  while (root.scrollWidth > width || root.offsetHeight > height) {
    fontSize -= 5;
    root.style.fontSize = `${fontSize}px`;
  }
});
