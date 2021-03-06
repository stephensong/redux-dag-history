[![CircleCI](https://circleci.com/gh/Microsoft/redux-dag-history/tree/master.svg?style=svg)](https://circleci.com/gh/Microsoft/redux-dag-history/tree/master)

# Redux DAG History

Nonlinear History

This project is a redux middleware that provides an alternative take on application history. Independent threads of user exploration are tracked as 
separate "branches" in a state DAG (Directed Acyclic Graph) inspired roughly by Git version control. Some additional concepts have been implemented, 
including:

* Pinning states of interest
* Checking for state equivalency before inserting a new state
* Tracking alternate routes to a state
* Import/Export
