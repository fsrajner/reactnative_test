
// TransactionManagerServer.cpp : Defines the entry point for the console application.
//
#include <cstdio>
#include <cpprest/http_listener.h>              // HTTP server
#include <cpprest/json.h>                       // JSON library
#include <cpprest/uri.h>                        // URI library

int main()
{
	/*auto fileStream = std::make_shared<concurrency::streams::ostream>();

	// Open stream to output file.
	pplx::task<void> requestTask = concurrency::streams::fstream::open_ostream(U("results.html")).then([=](concurrency::streams::ostream outFile)
	{
		*fileStream = outFile;

		// Create http_client to send the request.
		web::http::client::http_client client(U("http://www.bing.com/"));

		// Build request URI and start the request.
		web::uri_builder builder(U("/search"));
		builder.append_query(U("q"), U("cpprestsdk github"));
		return client.request(web::http::methods::GET, builder.to_string());
	})

		// Handle response headers arriving.
		.then([=](web::http::http_response response)
	{
		printf("Received response status code:%u\n", response.status_code());

		// Write response body into the file.
		return response.body().read_to_end(fileStream->streambuf());
	})

		// Close the file stream.
		.then([=](size_t)
	{
		return fileStream->close();
	});

	// Wait for all the outstanding I/O to complete and handle any exceptions
	try
	{
		requestTask.wait();
	}
	catch (const std::exception &e)
	{
		printf("Error exception:%s\n", e.what());
	}

	return 0;*/
}

