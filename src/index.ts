import { MY_NUM } from "./module.js";

console.warn(MY_NUM)

// task 1
interface PriceInput {
    price: number;
    discount: number;
    isInstallment: boolean;
    months: number;
}

const totalPrice = ({ price, discount, isInstallment, months }: PriceInput): number => {
    const discountedPrice = price * (1 - discount / 100);

    if (isInstallment && months > 0) {
        return discountedPrice / months;
    } else {
        return discountedPrice;
    }
};

const price = totalPrice({ price: 100000, discount: 25, isInstallment: true, months: 12 });
console.log(price);

// 6250

//task 2
interface Comment {
    id: number;
    email: string;
}

const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

const getData = async (url: string): Promise<Comment[]> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Ошибка при получении данных');
    }
    const data = await response.json();
    return parseData(data);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return [];
  }
};

const parseData = (data: unknown): Comment[] => {
  if (!Array.isArray(data)) {
    throw new Error('Данные не являются массивом');
  }
  return data.map((item): Comment => {
    if (
      typeof item !== 'object' || item === null || typeof item.id !== 'number' || typeof item.email !== 'string'
    ) {
      throw new Error('Некорректный формат данных');
    }
    return { id: item.id, email: item.email };
  });
};

getData(COMMENTS_URL)
  .then(data => {
    data.forEach(comment => {
      console.log(`ID: ${comment.id}, Email: ${comment.email}`);
    });
  })
  .catch(error => {
    console.error('Ошибка при получении данных:', error);
  });


// const requestOptions = {
//     method: "POST",
//     redirect: "follow"
//   };
  // js fetch
//   fetch("https://jsonplaceholder.typicode.com/comments")
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.error(error));

// task 3

const posts = [
    {
      id: '62e69d5a5458aac0ed320b35',
      title: 'id labore ex et quam laborum',
      body: 'laudantium enim quasi est quidem magnam voluptate ipsam eostempora quo necessitatibusdolor quam autem quasireiciendis et nam sapiente accusantium'
    },
    {
      id: '62e69d5a5458aac0ed320b1c',
      title: 'quo vero reiciendis velit similique earum',
      body: 'est natus enim nihil est dolore omnis voluptatem numquamet omnis occaecati quod ullam at voluptatem error expedita pariaturnihil sint nostrum voluptatem reiciendis et'
    },
    {
      id: '62e69d5a5458aac0ed320b32',
      title: 'odio adipisci rerum aut animi',
      body: 'quia molestiae reprehenderit quasi aspernaturaut expedita occaecati aliquam eveniet laudantiumomnis quibusdam delectus saepe quia accusamus maiores nam estcum et ducimus et vero voluptates excepturi deleniti ratione'
    },
    {
      id: '62e69d5a5458aac0ed320b39',
      title: 'alias odio sit',
      body: 'non et atqueoccaecati deserunt quas accusantium unde odit nobis qui voluptatemquia voluptas consequuntur itaque doloret qui rerum deleniti ut occaecati'
    },
    {
      id: '62e69d5a5458aac0ed320b53',
      title: 'vero eaque aliquid doloribus et culpa',
      body: 'harum non quasi et rationetempore iure ex voluptates in rationeharum architecto fugit inventore cupiditatevoluptates magni quo et'
    },
    {
      id: '62e69d5a5458aac0ed320b19',
      title: 'et fugit eligendi deleniti quidem qui sint nihil autem',
      body: 'doloribus at sed quis culpa deserunt consectetur qui praesentiumaccusamus fugiat dictavoluptatem rerum ut voluptate autemvoluptatem repellendus aspernatur dolorem in'
    },
    {
      id: '62e69d5a5458aac0ed320b25',
      title: 'repellat consequatur praesentium vel minus molestias voluptatum',
      body: 'maiores sed dolores similique labore et inventore etquasi temporibus esse sunt id eteos voluptatem aliquamratione corporis molestiae mollitia quia et magnam dolor'
    }
  ];


interface Post {
    id: string;
    title: string;
    body: string;
  }
  
  interface NormalizedData {
    byId: Record<string, Post>;
    allIds: string[];
  }
  
  const normalizeData = (unnormalizedData: Post[]): NormalizedData => {
    const normalizedData: NormalizedData = {
      byId: {},
      allIds: [],
    };
  
    unnormalizedData.forEach((post) => {
      normalizedData.byId[post.id] = post;
      normalizedData.allIds.push(post.id);
    });
  
    return normalizedData;
  };
  
  console.log(normalizeData(posts));
