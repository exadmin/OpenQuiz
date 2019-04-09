package com.xartifex.simplequiz.util;

import com.xartifex.simplequiz.model.Question;
import com.xartifex.simplequiz.user.UserInfo;
import org.hamcrest.Matchers;
import org.junit.Assert;
import org.junit.Test;

import java.util.Collection;
import java.util.LinkedList;
import java.util.Set;

public class UtilTest {

    public static final String TEST_INPUT_1 ="Героиня повести Дафны дю Морье́ вынуждена отправить любимую дочь в пансион далеко от дома. Поэтому ОНИ для героини были как островки цветного бисера на сером полотне, натянутом на пяльцы. Назовите ИХ словом латинского происхождения. \t| Каникулы ||\n" +
            "Внимание, в вопросе есть замена. Укулеле – это четырехструнная гавайская гитара. Миниатюрность этого инструмента и тот факт, что его название переводится как «прыгающая Стрекоза» позволяет сравнить мастеров, делающих укулеле, с персонажем произведения Николая Семеновича. Назовите слово, которое мы заменили на «стрекоза».| \tБлоха||";

    public static final String USERS_TEST_INPUT =
            "Ivan Ivanov, Иванов Иван Иванович, ivan.ivanov@email.com\n" +
            "Petr Petrov, Петров Петр Петрович, petr.petrov@email.com\n" +
            "Sidor Sidorov, Сидоров Сидор Сидорович, sidor.sidorov@email.com\n" +
            "Some Some,,some.some@email.com\n";

    @Test
    public void getQuestions() throws Exception {
        Collection<Question> actualQuestions = Util.getQuestions(TEST_INPUT_1);

        Question question1 = new Question();
        question1.setQuestion("Героиня повести Дафны дю Морье́ вынуждена отправить любимую дочь в пансион далеко от дома. Поэтому ОНИ для героини были как островки цветного бисера на сером полотне, натянутом на пяльцы. Назовите ИХ словом латинского происхождения.");
        question1.setAnswer("Каникулы");

        Question question2 = new Question();
        question2.setQuestion("Внимание, в вопросе есть замена. Укулеле – это четырехструнная гавайская гитара. Миниатюрность этого инструмента и тот факт, что его название переводится как «прыгающая Стрекоза» позволяет сравнить мастеров, делающих укулеле, с персонажем произведения Николая Семеновича. Назовите слово, которое мы заменили на «стрекоза».");
        question2.setAnswer("Блоха");

        Collection<Question> expectedQuestions = new LinkedList<>();
        expectedQuestions.add(question1);
        expectedQuestions.add(question2);
        Assert.assertThat(actualQuestions, Matchers.equalTo(expectedQuestions));
    }

    @Test
    public void getUsers() throws Exception {
        Set<UserInfo> users = Util.getUsers(USERS_TEST_INPUT);
        Assert.assertTrue(users.size() == 4);
    }

    public static final String SAMPLE_QUESTION ="По одной из версий, это слово появилось во время гражданской войны в США. Если для охраны пленных не хватало людей — на земле рисовали круг и загоняли пленных в него. " +
            "Всех, кто выходил из круга, расстреливали. " +
            "Это слово является названием романа Криса Кратчера, главный герой которого узнаёт, что он болен неизлечимой формой лейкемии и пытается прожить всю свою жизнь за один год. Назовите это слово.\n";

    @Test
    public void encodeTest() throws Exception {
        System.out.println(Util.encode(SAMPLE_QUESTION));
    }
}