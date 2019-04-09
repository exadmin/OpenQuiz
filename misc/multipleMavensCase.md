#How to package this game in case of multiple mavens
If you need to isolate your new maven installation then
* in settings.xml set custom repo:
  `<localRepository>my_new_local_repo_path</localRepository>`
* `set JAVA_HOME=<java installation folder>`
* `set MAVEN_HOME=<maven installation folder>`
* `mvn package -s <settings location>/settings.xml --global-settings <settings location>/settings.xml`