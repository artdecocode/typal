An argument can be specified in a number of ways. The examples below show the source code and how it is rendered by _Documentary_:

1. In the body of the `constructor` or `interface` elements in XML, and its methods:
    %EXAMPLE: wiki/Arg/constr.xml%
    <typedef narrow details="Example">wiki/Arg/constr.xml</typedef>
    <hr>
1. In the body of a function of a type, or in its arguments:
    %EXAMPLE: wiki/Arg/fn.xml%
    <typedef narrow details="FnExample">wiki/Arg/fn.xml</typedef>
    <hr>
1. In the body of a method:
    %EXAMPLE: wiki/Arg/method.xml%
    <typedef level="4" narrow details="Location">wiki/Arg/method.xml</typedef>

%~%

The actual _Arg_ interface is the following:

<typedef narrow flatten>types/Arg.xml</typedef>