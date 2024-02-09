setup-frontend:
	@cd packages/frontend && yarn install # Make sure this is a tab

setup-backend:
	@cd packages/backend && python3 -m venv venv && . venv/bin/activate && pip install -r requirements.txt # Tab here too

setup: setup-frontend setup-backend

start-frontend:
	@cd packages/frontend && yarn dev # Tab

start-backend:
	@cd packages/backend && . venv/bin/activate && uvicorn main:app --reload # Tab

