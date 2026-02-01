// Placeholder Java solution for practice
import java.util.*;
public class stack_ops {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        Deque<Integer> st=new ArrayDeque<>();
        if(sc.hasNextInt()) st.push(sc.nextInt());
        System.out.println(st.isEmpty()?"empty":"stacked");
    }
}
