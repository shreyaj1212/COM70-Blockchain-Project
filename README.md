# COM70-Blockchain-Project

<h2>components</h2>
This folder includes the components of our blockchain simulation: Block, Blockchain, Test, Transaction, and User

<h3>Block</h3>
Every block holds a certain number of transactions. In our example, we set this value to 3 for simplicity in the simluation. Essentially, a Block is a portion of the data storage of transactions. 

<h3>Blockchain</h3>
Is an ordered array of Block objects. 

<h3>Transaction</h3>
Each Transaction has a buyer, a sellar, an amount of coin sold, and a signature to show if it's valid or not. Each transaction also has a unique id which we generate using uuid. 

<h3>User</h3>
Each user is identified by its ipAddress. Each user has a secretKey which is used to generate a signature for a transaction (in each transaction, only the person who is losing money's secret key is needed to generate the signature). 

<h2>index.js</h2>
This is where all of the API work is located. There are routes to <br>
1. get the homepage <br>
2. view all the users (displayed on homepage) <br>
3. add users to the simulation <br>
4. make new transactions between users in the simulation <br>
5. view the current blockchain based off of the transactions added in the simulation <br>
6. update a user's wealth <br>

public folder - includes index.html and style.css

views folder - includes handlebars layout
Though we only have one page, we decided to add this feature for flexibility in terms of scale. 

<h2>Demo</h2>

the page a user arrives at
![Screen Shot 2021-10-24 at 2 15 27 PM](https://user-images.githubusercontent.com/32113511/138607348-90992083-7775-4d02-8ebc-56478c4c6e3a.png)

Add a user named Shreya. Let's give her 50 coins. 

![add shreya](https://user-images.githubusercontent.com/32113511/138607377-41b37b81-0f91-4d55-bd70-268814785a23.png)

Shreya has been added. Here is the response from the server, displayed on the front page. 

![shreya has been added](https://user-images.githubusercontent.com/32113511/138607415-ad0f1534-faea-4119-9d2c-50d4a31ed166.png)

Now let's add Grace. 

![add Grace](https://user-images.githubusercontent.com/32113511/138607440-27140d73-bbd7-4b4e-8e18-8d63835326f2.png)

Now that Grace has been added, let's start a transaction. Let's start with an example where Shreya refuses to sign the transaction. In this case, the transaction will not occur. 

![grace added, start transaction](https://user-images.githubusercontent.com/32113511/138607463-96425f3f-73cd-4ab8-8a58-25ae1d8290dc.png)

The response from the server is as follows: 

![Screen Shot 2021-10-24 at 2 18 30 PM](https://user-images.githubusercontent.com/32113511/138607478-db4c864c-0598-49b1-954b-be7412332e7f.png)

Now let's demonstrate a signed transaction. 

![signed transaction](https://user-images.githubusercontent.com/32113511/138607504-9bd84b7d-f0cb-4dc4-9ab4-cf2bb97a9e07.png)

Let's do this transaction again to demonstrate how many transactions can be stored in the block. The block should hold 2 transactions where Shreya gives Grace 10 coin. 

![Screen Shot 2021-10-24 at 2 18 55 PM](https://user-images.githubusercontent.com/32113511/138607546-ee2bd801-ce3d-4d12-9491-aaa79e9f40cd.png)

Currently, there is no proofOfWork because there is only 1 block in the chain. When we add a new block, that proofOfWork will display. 

Let's add RandomPerson to the simulation. RandomPerson starts with 0 coin, but Shreya and Grace both give RandomPerson 5 coin each. 

![Screen Shot 2021-10-24 at 2 19 38 PM](https://user-images.githubusercontent.com/32113511/138607604-28e58f96-4e72-4458-9fb0-62ddb159e1ff.png)

Here, we can see there are 2 blocks. Now the proofOfWork field has a value that corresponds to the precedingHash of the next block. 

![Screen Shot 2021-10-24 at 2 19 38 PM](https://user-images.githubusercontent.com/32113511/138607657-571c4796-0da2-4aec-9143-f9a92d179f66.png)
