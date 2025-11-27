import { AppDataSource } from "./data-source";
import { Article } from "./entity/Article";
import { Tag } from "./entity/Tag";

AppDataSource.initialize()
  .then(async () => {
    const entityManager = AppDataSource.manager;

    // const article = await entityManager.find(Article, {
    //   relations: {
    //     tags: true,
    //   },
    // });

    // console.log(article);
    // console.log(article.map((item) => item.tags));

    // const article = await entityManager
    //   .createQueryBuilder(Article, "a")
    //   .leftJoinAndSelect("a.tags", "t")
    //   .getMany();

    // console.log(article);
    // console.log(article.map((item) => item.tags));

    // const article = await entityManager
    //   .getRepository(Article)
    //   .createQueryBuilder("a")
    //   .leftJoinAndSelect("a.tags", "t")
    //   .getMany();

    // console.log(article);
    // console.log(article.map((item) => item.tags));

    // const article = await entityManager.findOne(Article, {
    //   where: {
    //     id: 2,
    //   },
    //   relations: {
    //     tags: true,
    //   },
    // });

    // article.title = "ccccc";

    // article.tags = article.tags.filter((item) => item.name.includes("ttt111"));

    // await entityManager.save(article);

    await entityManager.delete(Article, 1);
    await entityManager.delete(Tag, 1);

  })
  .catch((error) => console.log(error));
