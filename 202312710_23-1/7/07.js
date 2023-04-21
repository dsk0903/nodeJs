// promise
function getData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("data");
      }, 1000);
    });
}
  
getData()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });

// async/await
async function getData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("data");
      }, 1000);
    });
  }
  
  async function main() {
    try {
      const result = await getData();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  
  main();
