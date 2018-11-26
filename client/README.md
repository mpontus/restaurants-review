# Restaurant Reviews Client

Frontend for Restaurant Reviews Application built using Typescript, React, Redux, React Hooks and Material-UI

## Testing

Install dependencies using `yarn` command and run `yarn cypress open` to evaluate cypress tests.

## Directory structure:

```
/cypress		# E2E tests
/public			# Raw assets
/src            # Source files
| /actions		# Redux actions
| /api			# Network layer
| | /methods	# Individual API methods
| | /schema		# Response validaiton schemas
| /components	# UI and utility components
| /containers	# Components connected to redux store
| /epics		# Redux async logic
| /screens		# Individual views of the app
| /hooks		# Custom hooks
| /models		# Application entities
| /reducers		# Redux state logic
| /schemas		# Entity normalizaiton schemas
| /screens		# Application pages
| /selectors	# Redux state selectors
| config.ts		# Application config
| store.ts		# Redux store setup
| routes.ts		# Application routes
| theme.ts		# Material-UI theme
```
