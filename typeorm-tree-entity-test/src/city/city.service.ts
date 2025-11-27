import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {
  @InjectEntityManager()
  entityManager: EntityManager;

  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  async findAll() {
    // const city = new City();
    // city.name = '华北';
    // await this.entityManager.save(city);

    // const cityChild = new City();
    // cityChild.name = '山东';
    // const parent = await this.entityManager.findOne(City, {
    //   where: {
    //     name: '华北',
    //   },
    // });
    // if (parent) {
    //   cityChild.parent = parent;
    // }
    // await this.entityManager.save(City, cityChild);

    // return this.entityManager.getTreeRepository(City).findTrees();
    // const city = new City();
    // city.name = '华南';
    // await this.entityManager.save(city);

    // const cityChild1 = new City();
    // cityChild1.name = '云南';
    // const parent = await this.entityManager.findOne(City, {
    //   where: {
    //     name: '华南',
    //   },
    // });
    // if (parent) {
    //   cityChild1.parent = parent;
    // }
    // await this.entityManager.save(City, cityChild1);

    // const cityChild2 = new City();
    // cityChild2.name = '昆明';

    // const parent2 = await this.entityManager.findOne(City, {
    //   where: {
    //     name: '云南',
    //   },
    // });
    // if (parent && parent2) {
    //   cityChild2.parent = parent2;
    // }
    // await this.entityManager.save(City, cityChild2);

    // return this.entityManager.getTreeRepository(City).find(); // findTrees 树结果

    // return this.entityManager.getTreeRepository(City).findRoots();

    // -children
    // const parent = await this.entityManager.findOne(City, {
    //   where: {
    //     name: '云南',
    //   },
    // });
    // if (!parent) {
    //   return [];
    // }
    // return this.entityManager
    //   .getTreeRepository(City)
    //   .findDescendantsTree(parent);  -- findDescendants 扁平结构

    // -- parent
    // const parent = await this.entityManager.findOne(City, {
    //   where: {
    //     name: '云南',
    //   },
    // });
    // if (!parent) {
    //   return [];
    // }
    // return this.entityManager.getTreeRepository(City).findAncestors(parent);

    const parent = await this.entityManager.findOne(City, {
      where: {
        name: '云南',
      },
    });
    if (!parent) {
      return 0;
    }
    return this.entityManager.getTreeRepository(City).countAncestors(parent); // 可以调用 countAncestors 和 countDescendants 来计数
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
