package com.xartifex.simplequiz.user;

public class UserInfo {
    private final String name;
    private final String email;
    private final String rusName;
    private final String office;

    public UserInfo(String name, String email) {
        this(name,"",email, "");
    }

    public UserInfo(String name, String rusName, String email, String office) {
        if((name == null) || (rusName == null) || (office == null) || (email== null)) {
            throw new IllegalStateException("Parameter cant be null!");
        }
        this.name = name;
        this.email = email;
        this.rusName = rusName;
        this.office = office;
    }

    private String skipSurnameForRus(String name) {
        String[] words = name.split(" ");
        StringBuilder extracted = new StringBuilder();
        for(int i = 1; i < words.length; i++) {
            extracted.append(words[i] + " ");
        }
        return extracted.toString().trim();
    }

    private String skipSurnameForEng(String name) {
        String[] words = name.split(" ");
        StringBuilder extracted = new StringBuilder();
        for(int i = 0; i < 1; i++) {
            extracted.append(words[i] + " ");
        }
        return extracted.toString().trim();
    }

    public String getName() {
        return name;
    }

    public String resolveName() {
        return rusName == "" ? skipSurnameForEng(name) : skipSurnameForRus(rusName);
    }

    public String getEmail() {
        return email;
    }

    public String getRusName() {
        return rusName;
    }

    public String getOffice() {
        return office;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserInfo userInfo = (UserInfo) o;

        if (!name.equals(userInfo.name)) return false;
        if (!email.equals(userInfo.email)) return false;
        if (!rusName.equals(userInfo.rusName)) return false;
        return office.equals(userInfo.office);
    }

    @Override
    public int hashCode() {
        int result = name.hashCode();
        result = 31 * result + email.hashCode();
        result = 31 * result + rusName.hashCode();
        result = 31 * result + office.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", rusName='" + rusName + '\'' +
                ", office='" + office + '\'' +
                '}';
    }
}
