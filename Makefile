get-shell:
	docker-compose run web /bin/bash

up:
	docker-compose up

stop:
	docker-compose stop

build:
	docker-compose run web yarn build

deploy:
	git push origin `git subtree split --prefix build master`:gh-pages --force                                                                                                                                                    

.PHONY: get-shell up stop deploy build

