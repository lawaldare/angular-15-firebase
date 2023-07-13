import { Todo } from './todo/todo.component';

export const sort = (array: Todo[]): Todo[] => {
  return array.sort((a: Todo, b: Todo) => {
    var textA = a.text.toUpperCase();
    var textB = b.text.toUpperCase();

    if (textA < textB) {
      return -1;
    }
    if (textA > textB) {
      return 1;
    }

    return 0;
  });
};
