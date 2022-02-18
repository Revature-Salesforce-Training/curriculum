public class AnotherExampleClass {

    public static void helloWorld() {
        System.debug('Hello World!');

        Integer i = 3;
    }


    Integer i = 3;
    String s = '1';

    SObject myObj = new Account();
    Account acc = (Account) myObj;

    String a = '1';
    Integer b = Integer.valueOf(a);

    //Decimal a = 1.7;
    //Integer b = (Integer) a;

    public static void myMethod() {

        List<String> shoppingList = new List<String>();
        List<String> clownCars = new List<String>{
            'Nova',
            'Bus'
        };
        shoppingList.add('Chuck E. Cheese Pizza');
        shoppingList.add('Volvo 1962');
        shoppingList[0] = 'Chuck E. Cheese Tokens';
        

        Set<String> emailSet = new Set<String>();
        emailSet.add('johndow@owiej.com');
        emailSet.add('johndow@owiej.com');
    }
}