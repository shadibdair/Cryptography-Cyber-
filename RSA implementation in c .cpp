#include <stdio.h>
#include <math.h>

// RSA implementation in c:

// gcd - Euclides algorithm - greatest common diviser. 
int gcd(int a, int h) {
	int temp;
	while (1) 
	{
		temp = a % h;
		if (temp == 0)
			return h;
		a = h;
		h = temp;
	}
}

void main()
{
	// Alice's two random prime numbers:
	double p = 3;
	double q = 7;

	// N number to publish. 
	double n = q * p;

	double count;
	double toint = (p - 1)*(q - 1);

	// public key, e = encrypt. 
	double e = 2;

	// check co-prime which satisfies e>1
	while (e < toint) {
		count = gcd(e, toint);
		if (count == 1)
			break;
		else
			e++;
	}

	// private key : d, d=decrypt. 
	double d;

	// k can be any arbitrary value. 
	double k = 2;

	// 
	d = (1 + (k*toint)) / e;
	double msg = 12;
	double c = pow(msg, e);
	double m = pow(c, d);
	c = fmod(c, n);
	m = fmod(m, n);

	printf("Message data = %.2lf", msg);
	printf("\np = %.2lf", p);
	printf("\nq = %.2lf", q);
	printf("\nn = pq = %.2lf", n);
	printf("\ntoint = %.2lf", toint);
	printf("\ne = %.2lf", e);
	printf("\nd = %.2lf", d);
	printf("\nEncrypted data = %.2lf", c);
	printf("\nOriginal Message Sent = %.2lf", m);


	getchar();

}
