package com.xartifex.simplequiz.util;

import com.xartifex.simplequiz.model.Question;
import com.xartifex.simplequiz.model.Rule;
import com.xartifex.simplequiz.user.UserInfo;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;
import java.util.List;

//Note: String is not Closeable so there is no need in calling scanner.close();
public class Util {

    public static Collection<Question> getQuestions(String input){
        List<Question> questions = new LinkedList<>();
        Scanner questionsScanner = new Scanner(input);
        questionsScanner.useDelimiter("\\|\\|");
        while(questionsScanner.hasNext()) {
            Scanner textAnswerScan = new Scanner(questionsScanner.next());
            textAnswerScan.useDelimiter("\\|");
            String questionStr = textAnswerScan.next().trim();
            if (!questionStr.equals("")) {
                String answer = textAnswerScan.next().trim();
                Question question = new Question();
                question.setQuestion(questionStr);
                question.setAnswer(answer);
                questions.add(question);
            }
        }
        return questions;
    }

    //Timeout

    public static long getTimeout(String data){

        long timeout = 0;
        Scanner timeoutScanner = new Scanner(data);
        timeout =  Long.valueOf(timeoutScanner.next().trim());

        return timeout;
    }

    public static Set<UserInfo> getUsers(String data) {
        Set<UserInfo> users = new HashSet<>();
        Scanner scanner = new Scanner(data);
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            String tline = line.trim();
            if (!tline.equals("")) {
                Scanner csv = new Scanner(line);
                csv.useDelimiter(",");
                String name = csv.next();
                String rusName = csv.next();
                String email = csv.next();
                String office = csv.hasNext() ? csv.next() : "";
                users.add(new UserInfo(name.trim(), rusName.trim(), email.trim().toLowerCase(), office.trim()));
            }
        }
        return users;
    }

        public static List getRules(String data){
       List rules = new ArrayList<>(); 
       rules.add(new Rule(400003L,data));
       return rules;
    }

    public static String encode(String text) {
        int width = 610;
        int height = 290;

        BufferedImage bufferedImage = new BufferedImage(width, height,
                BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics = (Graphics2D) bufferedImage.getGraphics();
        graphics.setColor(Color.WHITE);
        graphics.fillRect(0, 0, width, height);
        graphics.setColor(Color.BLACK);
        graphics.setFont(new Font("Arial", Font.PLAIN, 20));
        graphics.setRenderingHint(
                RenderingHints.KEY_TEXT_ANTIALIASING,
                RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
        int lineHeight = graphics.getFontMetrics().getHeight();
        List<String> wrapped = StringUtils.wrap(text, graphics.getFontMetrics(), width - 20);
        for (int lineCount = 0; lineCount < wrapped.size(); lineCount++) {
            int xPos = 1;
            int yPos = 20 + lineCount * lineHeight;
            String line = wrapped.get(lineCount);
            graphics.drawString(line, xPos, yPos);
        }
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            ImageIO.write(bufferedImage, "png", baos);
        } catch (IOException e) {
            throw new RuntimeException("Unable to transform the following text: " + text);
        }
        return Base64.getEncoder().encodeToString(baos.toByteArray());
    }
}