import {
  IDagHistory,
  StateNameGenerator,
  StateId,
  BranchId,
} from '../interfaces';
import DagGraph from '../DagGraph';
import { jump } from './jump';

const log = require('debug')('redux-dag-history:DagHistory');

export default function jumpToBranch<T>(branch: BranchId, history: IDagHistory<T>): IDagHistory<T> {
  log('jumping to branch %s', branch);
  const { pinnedStateId, graph } = history;
  const reader = new DagGraph(graph);
  const branches = reader.branches;

  const jumpTo = (state: StateId) => (
    jump(
      state,
      history,
      {},
      writer => writer.setCurrentBranch(branch),
    )
  );

  if (branches.indexOf(branch) === -1) {
    return this.createBranch(branch, history);
  } else if (pinnedStateId) {
    // If a state is pinned, navigate to its successor
    const branchPath = reader.branchCommitPath(branch);
    const childStateIds = branchPath.filter(state => reader.parentOf(state) === pinnedStateId);
    const childStateId = childStateIds.length > 0 ? childStateIds[0] : null;
    if (childStateId) {
      return jumpTo(childStateId);
    }
  }

  return jumpTo(reader.committedOn(branch));
}
