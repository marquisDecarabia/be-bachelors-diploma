---
to: src/modules/<%= modulePath %>/database/<%= h.changeCase.paramCase(name) %>.repository.ts
---
<%
 PascalCaseName = `${h.inflection.camelize(entityName, false)}`
 CamelCaseName = `${h.inflection.camelize(entityName, true)}`
 PascalCaseEntityName = `${PascalCaseName}Entity`
 PascalCaseOrmEntityName = `${PascalCaseName}OrmEntity`
 PascalCaseOrmMapperName = `${PascalCaseName}OrmMapper`
 RepositoryName = `${PascalCaseName}Repository`
 RepositoryPortName = `${PascalCaseName}RepositoryPort`
 EntityPropsName = `${PascalCaseName}Props`
%>
import { Injectable, Logger } from '@nestjs/common';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@libs/ddd/infrastructure/database/base-classes/typeorm.repository.base';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { NotFoundException } from '@exceptions';

@Injectable()
export class <%= RepositoryName %>
  extends TypeormRepositoryBase<<%= PascalCaseEntityName %>, <%= EntityPropsName %>, <%= PascalCaseOrmEntityName %>>
  implements <%= RepositoryPortName %>
{
  protected relations: string[] = [];

  constructor(
    @InjectRepository(<%= PascalCaseOrmEntityName %>)
    private readonly <%= RepositoryName %>: Repository<<%= PascalCaseOrmEntityName %>>,
  ) {
    super(
      <%= RepositoryName %>,
      new <%= PascalCaseOrmMapperName %>(<%= PascalCaseEntityName %>, <%= PascalCaseOrmEntityName %>),
      new Logger('<%= RepositoryName %>'),
    );
  }

  private async findOneById(id: string): Promise<<%= PascalCaseOrmEntityName %> | undefined> {
    return await this.<%= RepositoryName %>.findOne({
      where: { id },
    });
  }

  async findOneByIdOrThrow(id: string): Promise<<%= PascalCaseEntityName %>> {
    const <%= CamelCaseName %> = await this.findOneById(id);
    if (!<%= CamelCaseName %>) {
      throw new NotFoundException(`<%= PascalCaseName %> with id '${id}' not found`);
    }
    return this.mapper.toDomainEntity(<%= CamelCaseName %>);
  }

  async exists(id: string): Promise<boolean> {
    const found = await this.findOneById(id);
    return !!found;
  }

  // Used to construct a query
  protected prepareQuery(
    params: QueryParams<<%= EntityPropsName %>>,
  ): WhereCondition<<%= PascalCaseOrmEntityName %>> {
    const where: QueryParams<<%= PascalCaseOrmEntityName %>> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    return where;
  }
}

