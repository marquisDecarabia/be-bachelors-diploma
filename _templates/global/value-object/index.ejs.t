---
to: src/libs/ddd/domain/value-objects/<%= h.changeCase.paramCase(name) %>.value-object.ts
---
<%
 PascalCaseName = h.inflection.camelize(name)
 Props = `${PascalCaseName}Props`
%>
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';

// TODO: correct interface for props
export interface <%= Props %> {
}

export class <%= PascalCaseName %> extends ValueObject<<%= Props %>> {
  // TODO: Getters for props
  get country() {
  }

  // TODO: Validation for props
  protected validate(props: <%= Props %>): void {
  }
}